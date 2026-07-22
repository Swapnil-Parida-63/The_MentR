/**
 * @file analytics-event.model.js
 * @description Mongoose Database Schema for AI Telemetry & Performance Metrics.
 * 
 * RESPONSIBILITY:
 * Records operational metrics, prompt latency, token costs, intent categorization, and error occurrences.
 * 
 * FUTURE PURPOSE:
 * Enables monitoring of Mentee AI performance, conversation quality, model latency SLAs, and cost analytics.
 * 
 * CONNECTIONS:
 * - Managed by `analytics.service.js`.
 * - Aggregated for dashboard analytics and performance reporting.
 */

const mongoose = require('mongoose');

const analyticsEventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    sessionId: {
      type: String,
      index: true
    },
    eventType: {
      type: String,
      enum: ['chat_completion', 'embedding_gen', 'retrieval_query', 'booking_step', 'escalation', 'feedback', 'error'],
      required: true,
      index: true
    },
    latencyMs: {
      type: Number,
      default: 0
    },
    tokenUsage: {
      promptTokens: { type: Number, default: 0 },
      completionTokens: { type: Number, default: 0 },
      totalTokens: { type: Number, default: 0 }
    },
    clientChannel: {
      type: String,
      default: 'website'
    },
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

analyticsEventSchema.index({ eventType: 1, createdAt: -1 });

const AnalyticsEvent = mongoose.model('AIAnalyticsEvent', analyticsEventSchema);

module.exports = { AnalyticsEvent, analyticsEventSchema };
