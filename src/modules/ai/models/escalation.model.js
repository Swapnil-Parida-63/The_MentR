/**
 * @file escalation.model.js
 * @description Mongoose Database Schema for AI-to-Human Support Escalation Records.
 * 
 * RESPONSIBILITY:
 * Tracks user requests that require human intervention, counselor hand-off, or customer service tickets.
 * 
 * FUTURE PURPOSE:
 * Automatically triggered when Mentee detects high frustration, complex custom queries, or direct human contact requests.
 * 
 * CONNECTIONS:
 * - Links conversation session history to human support tickets / CRM notifications.
 * - Used by `chat.service.js` and `analytics.service.js`.
 */

const mongoose = require('mongoose');

const escalationSchema = new mongoose.Schema(
  {
    escalationId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    sessionId: {
      type: String,
      required: true,
      index: true
    },
    reason: {
      type: String,
      enum: ['user_requested', 'complex_query', 'negative_sentiment', 'booking_failure', 'other'],
      required: true
    },
    userContact: {
      phone: { type: String, default: '' },
      email: { type: String, default: '' },
      name: { type: String, default: '' }
    },
    summary: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['pending', 'assigned', 'resolved', 'closed'],
      default: 'pending',
      index: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Escalation = mongoose.model('AIEscalation', escalationSchema);

module.exports = { Escalation, escalationSchema };
