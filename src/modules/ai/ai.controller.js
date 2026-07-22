/**
 * @file ai.controller.js
 * @description HTTP Controller for Mentee AI Endpoints.
 * 
 * RESPONSIBILITY:
 * Handles incoming HTTP requests for AI endpoints, delegates to corresponding AI services,
 * and formats standardized JSON API responses.
 * 
 * CONNECTIONS:
 * - Express request handlers wrapped with `asyncHandler`.
 * - Delegates to `chatService`, `bookingService`, `analyticsService`, and `retrievalService`.
 * - Used by `ai.routes.js`.
 */

const { asyncHandler } = require('../../utils/async-handler');
const {
  chatService,
  bookingService,
  analyticsService,
  retrievalService
} = require('./services');

/**
 * POST /api/v1/ai/chat
 * Primary chat completion endpoint for Mentee AI.
 */
const chat = asyncHandler(async (req, res) => {
  const result = await chatService.processChatMessage({
    sessionId: req.body.sessionId,
    message: req.body.message,
    history: req.body.history || [],
    channel: req.body.channel || req.aiContext?.clientChannel,
    context: req.body.context
  });

  res.status(200).json({
    success: true,
    data: result
  });
});

/**
 * POST /api/v1/ai/booking/start
 * Initiates conversational mentor / assessment booking flow.
 */
const startBooking = asyncHandler(async (req, res) => {
  const result = await bookingService.startBooking({
    sessionId: req.body.sessionId,
    initialData: req.body
  });

  res.status(200).json({
    success: true,
    data: result
  });
});

/**
 * POST /api/v1/ai/booking/continue
 * Processes next step in conversational booking flow.
 */
const continueBooking = asyncHandler(async (req, res) => {
  const result = await bookingService.continueBooking({
    sessionId: req.body.sessionId,
    input: req.body.input
  });

  res.status(200).json({
    success: true,
    data: result
  });
});

/**
 * POST /api/v1/ai/feedback
 * Submits user rating / feedback for an AI response.
 */
const submitFeedback = asyncHandler(async (req, res) => {
  const result = await analyticsService.submitFeedback(req.body);

  res.status(200).json({
    success: true,
    data: result
  });
});

/**
 * POST /api/v1/ai/escalate
 * Creates a human support escalation ticket.
 */
const escalate = asyncHandler(async (req, res) => {
  const result = await analyticsService.submitEscalation(req.body);

  res.status(200).json({
    success: true,
    data: result
  });
});

/**
 * POST /api/v1/ai/index-knowledge
 * Triggers RAG knowledge re-indexing (Admin/System endpoint).
 */
const indexKnowledge = asyncHandler(async (req, res) => {
  const result = await retrievalService.indexKnowledgeDocuments({
    category: req.body.category
  });

  res.status(202).json({
    success: true,
    data: result
  });
});

/**
 * GET /api/v1/ai/health
 * Health check endpoint for AI module services.
 */
const getHealth = asyncHandler(async (_req, res) => {
  res.status(200).json({
    success: true,
    module: 'Mentee AI Subsystem',
    status: 'online',
    mode: 'foundation_placeholder',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

module.exports = {
  chat,
  startBooking,
  continueBooking,
  submitFeedback,
  escalate,
  indexKnowledge,
  getHealth
};
