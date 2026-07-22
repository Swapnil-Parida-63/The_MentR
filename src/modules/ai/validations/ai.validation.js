/**
 * @file ai.validation.js
 * @description Zod Request Payload Validation Schemas for Mentee AI Endpoints.
 * 
 * RESPONSIBILITY:
 * Enforces strong input validation for chat prompts, booking steps, feedback submissions, and escalation tickets.
 * 
 * FUTURE PURPOSE:
 * Prevents malformed API requests, injection attacks, and invalid field parameters before hitting controller logic.
 * 
 * CONNECTIONS:
 * - Used in `ai.routes.js` with `validate()` middleware.
 */

const { z } = require('zod');

const chatSchema = z.object({
  body: z.object({
    sessionId: z.string().min(1, 'sessionId is required'),
    message: z.string().min(1, 'message is required'),
    channel: z.enum(['website', 'ios', 'android', 'desktop']).optional().default('website'),
    history: z.array(
      z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string()
      })
    ).optional().default([]),
    context: z.record(z.any()).optional()
  })
});

const startBookingSchema = z.object({
  body: z.object({
    sessionId: z.string().min(1, 'sessionId is required'),
    studentGrade: z.string().optional(),
    parentName: z.string().optional()
  })
});

const continueBookingSchema = z.object({
  body: z.object({
    sessionId: z.string().min(1, 'sessionId is required'),
    input: z.string().min(1, 'input text or response payload is required')
  })
});

const feedbackSchema = z.object({
  body: z.object({
    sessionId: z.string().min(1, 'sessionId is required'),
    messageId: z.string().optional(),
    rating: z.enum(['thumbs_up', 'thumbs_down', 'rating_1_to_5']),
    numericScore: z.number().min(1).max(5).optional(),
    comments: z.string().optional()
  })
});

const escalateSchema = z.object({
  body: z.object({
    sessionId: z.string().min(1, 'sessionId is required'),
    reason: z.enum(['user_requested', 'complex_query', 'negative_sentiment', 'booking_failure', 'other']),
    userContact: z.object({
      phone: z.string().optional(),
      email: z.string().optional(),
      name: z.string().optional()
    }).optional(),
    summary: z.string().optional()
  })
});

const indexKnowledgeSchema = z.object({
  body: z.object({
    category: z.enum(['company', 'parents', 'teachers', 'pricing', 'policies', 'methodology', 'blogs', 'faqs']).optional(),
    forceReindex: z.boolean().optional().default(false)
  })
});

module.exports = {
  chatSchema,
  startBookingSchema,
  continueBookingSchema,
  feedbackSchema,
  escalateSchema,
  indexKnowledgeSchema
};
