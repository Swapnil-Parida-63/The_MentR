/**
 * @file message.model.js
 * @description Mongoose Database Schema for AI Conversation Messages.
 * 
 * RESPONSIBILITY:
 * Records individual prompt and completion messages within an AI conversation context.
 * 
 * FUTURE PURPOSE:
 * Provides message history for multi-turn LLM prompts, token usage audits, retrieved RAG context references,
 * and user feedback linkage.
 * 
 * CONNECTIONS:
 * - Belongs to a `Conversation` session via `conversationId` / `sessionId`.
 * - Used by `conversation.service.js`, `chat.service.js`, and `analytics.service.js`.
 */

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AIConversation',
      default: null,
      index: true
    },
    role: {
      type: String,
      enum: ['system', 'user', 'assistant', 'tool'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    tokenCount: {
      promptTokens: { type: Number, default: 0 },
      completionTokens: { type: Number, default: 0 },
      totalTokens: { type: Number, default: 0 }
    },
    retrievedDocumentIds: [
      {
        type: String
      }
    ],
    metadata: {
      type: Map,
      of: String,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

messageSchema.index({ sessionId: 1, createdAt: 1 });

const Message = mongoose.model('AIMessage', messageSchema);

module.exports = { Message, messageSchema };
