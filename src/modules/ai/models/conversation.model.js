/**
 * @file conversation.model.js
 * @description Mongoose Database Schema for Active AI Conversation Sessions.
 * 
 * RESPONSIBILITY:
 * Defines persistent multi-turn chat sessions across Web, iOS, Android, and Desktop platforms.
 * Tracks extracted entities, active workflow states, user role (Parent/Student/Teacher),
 * session status, and activity timestamps for auto-expiration.
 * 
 * CONNECTIONS:
 * - Used by `conversation.manager.js` and `chat.service.js`.
 */

const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true
    },
    clientChannel: {
      type: String,
      enum: ['website', 'ios', 'android', 'desktop', 'unknown'],
      default: 'website',
      index: true
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'closed', 'archived'],
      default: 'active',
      index: true
    },
    currentWorkflow: {
      type: String,
      enum: ['general', 'booking_flow', 'teacher_onboarding', 'homework_help'],
      default: 'general'
    },
    workflowState: {
      step: { type: String, default: 'init' },
      pendingQuestion: { type: String, default: '' },
      collectedData: { type: Map, of: String, default: {} }
    },
    extractedEntities: {
      parentName: { type: String, default: '' },
      studentName: { type: String, default: '' },
      grade: { type: String, default: '' },
      board: { type: String, default: '' },
      subjects: { type: [String], default: [] },
      city: { type: String, default: '' },
      mode: { type: String, default: '' },
      preferredTiming: { type: String, default: '' },
      phone: { type: String, default: '' },
      email: { type: String, default: '' },
      role: { type: String, default: 'unknown' }
    },
    currentRole: {
      type: String,
      enum: ['parent', 'student', 'teacher', 'unknown'],
      default: 'unknown'
    },
    currentTopic: {
      type: String,
      default: 'general_guidance'
    },
    summary: {
      type: String,
      default: ''
    },
    lastActiveAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timestamps: true
  }
);

conversationSchema.index({ sessionId: 1, status: 1 });
conversationSchema.index({ userId: 1, updatedAt: -1 });

const Conversation = mongoose.models.AIConversation || mongoose.model('AIConversation', conversationSchema);

module.exports = { Conversation, conversationSchema };
