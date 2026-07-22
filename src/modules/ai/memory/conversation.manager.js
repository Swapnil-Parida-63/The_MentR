/**
 * @file conversation.manager.js
 * @description Active Conversation & Session Lifecycle Manager.
 * 
 * RESPONSIBILITY:
 * Manages active multi-turn chat sessions across Web, iOS, Android, and Desktop platforms.
 * Handles session creation, restoration, history persistence, entity updates, workflow tracking,
 * and idle session timeout expiration.
 * 
 * CONNECTIONS:
 * - Interacts with `Conversation` and `Message` database models.
 * - Uses `entityExtractor`.
 * - Called by `chat.service.js`.
 */

const { Conversation } = require('../models/conversation.model');
const { Message } = require('../models/message.model');
const { entityExtractor } = require('./entity.extractor');
const { aiConfig } = require('../config/ai.config');

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

    let session = await Conversation.findOne({ sessionId });

    const now = new Date();
    const timeoutMs = this.timeoutMinutes * 60 * 1000;

    if (session) {
      // Check if active session has expired due to inactivity
      const isExpired = now.getTime() - new Date(session.lastActiveAt).getTime() > timeoutMs;

      if (isExpired && session.status === 'active') {
        session.status = 'expired';
        await session.save();
        console.log(`[ConversationManager] Session ${sessionId} expired due to inactivity (${this.timeoutMinutes} min).`);

        // Create new active session document for same sessionId
        session = await Conversation.create({
          sessionId: `${sessionId}_r_${Date.now()}`,
          userId,
          clientChannel,
          status: 'active',
          lastActiveAt: now
        });
      } else {
        // Touch lastActiveAt timestamp on active session restore
        session.lastActiveAt = now;
        if (userId && !session.userId) session.userId = userId;
        await session.save();
      }
    } else {
      // Initialize new conversation session
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
  async addMessage({ sessionId, role, content, metadata = {} }) {
    const session = await this.getOrRestoreSession({ sessionId });

    // 1. Create and save AIMessage record
    const messageDoc = await Message.create({
      sessionId,
      conversation: session._id,
      role,
      content,
      metadata
    });

    // 2. If user message, automatically extract structured entity parameters
    if (role === 'user') {
      const currentEntities = session.extractedEntities ? session.extractedEntities.toObject() : {};
      const updatedEntities = this.extractor.extractEntities(content, currentEntities);

      session.extractedEntities = updatedEntities;
      if (updatedEntities.role && updatedEntities.role !== 'unknown') {
        session.currentRole = updatedEntities.role;
      }
    }

    session.lastActiveAt = new Date();
    await session.save();

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
    const session = await Conversation.findOne({ sessionId });
    if (!session) return null;

    session.currentWorkflow = workflowName || 'general';
    if (stateData.step) session.workflowState.step = stateData.step;
    if (stateData.pendingQuestion) session.workflowState.pendingQuestion = stateData.pendingQuestion;
    if (stateData.collectedData) {
      Object.assign(session.workflowState.collectedData, stateData.collectedData);
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
    await Message.deleteMany({ sessionId });
    const session = await Conversation.findOne({ sessionId });
    if (session) {
      session.status = 'closed';
      await session.save();
    }
    return true;
  }
}

const conversationManager = new ConversationManager();

module.exports = { ConversationManager, conversationManager };
