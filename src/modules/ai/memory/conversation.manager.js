/**
 * @file conversation.manager.js
 * @description Active Conversation & Session Lifecycle Manager with persistent MongoDB and in-memory fallback.
 * 
 * RESPONSIBILITY:
 * Manages active multi-turn chat sessions across Web, iOS, Android, and Desktop platforms.
 * Handles session creation, restoration, history persistence, entity updates, workflow tracking,
 * and idle session timeout expiration. Supports both persistent MongoDB Atlas and graceful in-memory storage.
 * 
 * CONNECTIONS:
 * - Interacts with `Conversation` and `Message` database models when MongoDB is connected.
 * - Uses in-memory session store when running offline or in unit tests.
 * - Uses `entityExtractor`.
 * - Called by `chat.service.js`.
 */

const mongoose = require('mongoose');
const { Conversation } = require('../models/conversation.model');
const { Message } = require('../models/message.model');
const { entityExtractor } = require('./entity.extractor');
const { aiConfig } = require('../config/ai.config');

const inMemorySessions = new Map();
const inMemoryMessages = new Map();

class ConversationManager {
  constructor(extractor = entityExtractor) {
    this.extractor = extractor;
    this.timeoutMinutes = aiConfig.limits?.sessionTimeoutMinutes || 60;
    this.memoryWindow = aiConfig.limits?.conversationMemoryWindow || 20;
  }

  /**
   * Retrieves an existing session or initializes a new active conversation.
   * Auto-restores unfinished sessions if within session timeout window.
   * 
   * @param {Object} params
   * @param {string} params.sessionId - Unique session identifier.
   * @param {string} [params.clientChannel='website'] - Originating platform channel.
   * @param {string} [params.userId] - Optional authenticated user ID.
   * @returns {Promise<Object>} Active conversation document.
   */
  async getOrRestoreSession({ sessionId, clientChannel = 'website', userId = null }) {
    if (!sessionId) {
      throw new Error('sessionId is required for ConversationManager');
    }

    // In-memory fallback if MongoDB is not connected
    if (mongoose.connection.readyState !== 1) {
      let session = inMemorySessions.get(sessionId);
      const now = new Date();
      if (!session) {
        session = {
          sessionId,
          userId,
          clientChannel,
          status: 'active',
          currentWorkflow: 'general',
          workflowState: { step: 'init', pendingQuestion: '', collectedData: new Map() },
          extractedEntities: {},
          currentRole: 'unknown',
          lastActiveAt: now,
          save: async () => session
        };
        inMemorySessions.set(sessionId, session);
      } else {
        session.lastActiveAt = now;
      }
      return session;
    }

    let session = await Conversation.findOne({ sessionId });

    const now = new Date();
    const timeoutMs = this.timeoutMinutes * 60 * 1000;

    if (session) {
      // Check if active session has expired due to inactivity
      const isExpired = now.getTime() - new Date(session.lastActiveAt).getTime() > timeoutMs;

      if (isExpired && session.status === 'active') {
        session.status = 'expired';
        await session.save();

        // Create new active session document for same sessionId
        session = await Conversation.create({
          sessionId: `${sessionId}_r_${Date.now()}`,
          userId,
          clientChannel,
          status: 'active',
          lastActiveAt: now
        });
      } else {
        session.lastActiveAt = now;
        if (userId && !session.userId) session.userId = userId;
        await session.save();
      }
    } else {
      session = await Conversation.create({
        sessionId,
        userId,
        clientChannel,
        status: 'active',
        lastActiveAt: now
      });
    }

    return session;
  }

  /**
   * Appends a user or assistant message to database history, updates entity extraction, and touches activity.
   * 
   * @param {Object} params
   * @param {string} params.sessionId - Unique session ID.
   * @param {string} params.role - 'user' | 'assistant' | 'system'.
   * @param {string} params.content - Message content text.
   * @param {Object} [params.metadata] - Optional message metadata.
   * @returns {Promise<Object>} Created AIMessage document.
   */
  async addMessage({ sessionId, role, content, metadata = {}, session = null }) {
    const activeSession = session || (await this.getOrRestoreSession({ sessionId }));

    // In-memory fallback when MongoDB is not connected
    if (mongoose.connection.readyState !== 1) {
      const msgList = inMemoryMessages.get(sessionId) || [];
      const msgDoc = {
        sessionId,
        role,
        content,
        metadata,
        createdAt: new Date()
      };
      msgList.push(msgDoc);
      inMemoryMessages.set(sessionId, msgList);

      if (role === 'user') {
        const currentEntities = activeSession.extractedEntities || {};
        const updatedEntities = this.extractor.extractEntities(content, currentEntities);
        activeSession.extractedEntities = updatedEntities;
        if (updatedEntities.role && updatedEntities.role !== 'unknown') {
          activeSession.currentRole = updatedEntities.role;
        }
      }
      activeSession.lastActiveAt = new Date();
      return msgDoc;
    }

    // 1. Create and save AIMessage record
    const messageDoc = await Message.create({
      sessionId,
      conversation: activeSession._id,
      role,
      content,
      metadata
    });

    // 2. If user message, automatically extract structured entity parameters
    if (role === 'user') {
      const currentEntities = activeSession.extractedEntities
        ? (typeof activeSession.extractedEntities.toObject === 'function'
            ? activeSession.extractedEntities.toObject()
            : activeSession.extractedEntities)
        : {};
      const updatedEntities = this.extractor.extractEntities(content, currentEntities);

      activeSession.extractedEntities = updatedEntities;
      if (updatedEntities.role && updatedEntities.role !== 'unknown') {
        activeSession.currentRole = updatedEntities.role;
      }
    }

    activeSession.lastActiveAt = new Date();
    await activeSession.save();

    return messageDoc;
  }

  /**
   * Retrieves recent message history formatted for LLM prompts within memory window limit.
   * 
   * @param {string} sessionId - Unique session ID.
   * @param {number} [limit] - Max recent messages to fetch.
   * @returns {Promise<Array<Object>>} Formatted messages array [{ role, content }].
   */
  async getRecentHistory(sessionId, limit = this.memoryWindow) {
    if (mongoose.connection.readyState !== 1) {
      const list = inMemoryMessages.get(sessionId) || [];
      return list.slice(-limit).map((m) => ({
        role: m.role,
        content: m.content
      }));
    }

    const messages = await Message.find({ sessionId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return messages.reverse().map((m) => ({
      role: m.role,
      content: m.content
    }));
  }

  /**
   * Updates active workflow state on the session.
   * 
   * @param {string} sessionId - Unique session ID.
   * @param {string} workflowName - e.g. 'booking_flow', 'teacher_onboarding', 'general'.
   * @param {Object} stateData - { step, pendingQuestion, collectedData }.
   */
  async updateWorkflowState(sessionId, workflowName, stateData = {}) {
    const session = await this.getOrRestoreSession({ sessionId });
    if (!session) return null;

    session.currentWorkflow = workflowName || 'general';
    if (session.workflowState) {
      if (stateData.step) session.workflowState.step = stateData.step;
      if (stateData.pendingQuestion) session.workflowState.pendingQuestion = stateData.pendingQuestion;
      if (stateData.collectedData) {
        if (session.workflowState.collectedData instanceof Map) {
          Object.entries(stateData.collectedData).forEach(([k, v]) => session.workflowState.collectedData.set(k, v));
        } else {
          Object.assign(session.workflowState.collectedData, stateData.collectedData);
        }
      }
    }
    session.lastActiveAt = new Date();
    await session.save();
    return session;
  }

  /**
   * Clears session history and resets state for fresh conversation restart.
   * 
   * @param {string} sessionId - Unique session ID.
   */
  async clearSession(sessionId) {
    inMemoryMessages.delete(sessionId);
    inMemorySessions.delete(sessionId);
    if (mongoose.connection.readyState === 1) {
      await Message.deleteMany({ sessionId });
      const session = await Conversation.findOne({ sessionId });
      if (session) {
        session.status = 'closed';
        await session.save();
      }
    }
    return true;
  }
}

const conversationManager = new ConversationManager();

module.exports = { ConversationManager, conversationManager };
