/**
 * @file ai.routes.js
 * @description Express Route Definitions for Mentee AI Subsystem Endpoints.
 * 
 * RESPONSIBILITY:
 * Defines REST endpoint routes for Mentee AI, binding validation schemas, context middlewares, and controllers.
 * 
 * FUTURE PURPOSE:
 * Serves as the single API interface for Web, iOS, Android, and Desktop frontend applications requesting AI capabilities.
 * 
 * CONNECTIONS:
 * - Mounted in `src/routes.js` under `/ai`.
 * - Uses `validate()` middleware with schemas from `./validations/ai.validation.js`.
 * - Uses context middlewares from `./middlewares/`.
 * - Connects to `ai.controller.js`.
 */

const express = require('express');
const { validate } = require('../../middlewares/validate.middleware');
const controller = require('./ai.controller');
const { extractAiContext } = require('./middlewares/ai-context.middleware');
const { aiLogger } = require('./middlewares/ai-logger.middleware');
const { aiRateLimiter } = require('./middlewares/ai-rate-limiter.middleware');
const {
  chatSchema,
  startBookingSchema,
  continueBookingSchema,
  feedbackSchema,
  escalateSchema,
  indexKnowledgeSchema
} = require('./validations/ai.validation');

const router = express.Router();

// Apply AI subsystem middlewares
router.use(aiLogger);
router.use(extractAiContext);
router.use(aiRateLimiter);

/**
 * @route GET /api/v1/ai/health
 * @desc AI subsystem health check
 */
router.get('/health', controller.getHealth);

/**
 * @route POST /api/v1/ai/chat
 * @desc Primary chat completion endpoint
 */
router.post('/chat', validate(chatSchema), controller.chat);

/**
 * @route POST /api/v1/ai/booking/start
 * @desc Initiate conversational booking flow
 */
router.post('/booking/start', validate(startBookingSchema), controller.startBooking);

/**
 * @route POST /api/v1/ai/booking/continue
 * @desc Process next step in conversational booking flow
 */
router.post('/booking/continue', validate(continueBookingSchema), controller.continueBooking);

/**
 * @route POST /api/v1/ai/feedback
 * @desc Submit user feedback / rating on an AI response
 */
router.post('/feedback', validate(feedbackSchema), controller.submitFeedback);

/**
 * @route POST /api/v1/ai/escalate
 * @desc Submit human support escalation request
 */
router.post('/escalate', validate(escalateSchema), controller.escalate);

/**
 * @route POST /api/v1/ai/index-knowledge
 * @desc Trigger RAG knowledge re-indexing
 */
router.post('/index-knowledge', validate(indexKnowledgeSchema), controller.indexKnowledge);

module.exports = router;
