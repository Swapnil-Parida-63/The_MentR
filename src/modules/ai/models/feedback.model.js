/**
 * @file feedback.model.js
 * @description Mongoose Database Schema for AI User Feedback Ratings.
 * 
 * RESPONSIBILITY:
 * Captures explicit user feedback (ratings, helpful/unhelpful binary votes, comment text) on AI responses.
 * 
 * FUTURE PURPOSE:
 * Used for Reinforcement Learning / Fine-Tuning evaluation and monitoring response quality.
 * 
 * CONNECTIONS:
 * - Linked to `Message` and `Conversation` entities.
 * - Used by `analytics.service.js` and `chat.service.js`.
 */

const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true
    },
    messageId: {
      type: String,
      default: ''
    },
    rating: {
      type: String,
      enum: ['thumbs_up', 'thumbs_down', 'rating_1_to_5'],
      required: true
    },
    numericScore: {
      type: Number,
      min: 1,
      max: 5,
      default: null
    },
    comments: {
      type: String,
      default: ''
    },
    userCategory: {
      type: String,
      enum: ['parent', 'student', 'teacher', 'general'],
      default: 'general'
    }
  },
  {
    timestamps: true
  }
);

const Feedback = mongoose.model('AIFeedback', feedbackSchema);

module.exports = { Feedback, feedbackSchema };
