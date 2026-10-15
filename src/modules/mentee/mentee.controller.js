/**
 * @file mentee.controller.js
 * @description Express Controller for Mentee Chatbot endpoints with full RAG and session support.
 */

const { asyncHandler } = require('../../utils/async-handler');
const { ApiError } = require('../../utils/api-error');
const { generateMenteeReply } = require('./mentee.service');

/**
 * Handle Mentee chat messages.
 *
 * @route POST /api/mentee/chat (and /api/v1/mentee/chat)
 * @body { "message": "string", "sessionId"?: "string", "history"?: Array, "context"?: Object }
 * @returns { "success": true, "reply": "string", "suggestedActions": Array, "sessionId": "string" }
 */
const chat = asyncHandler(async (req, res) => {
  const { message, sessionId, history, context, channel } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    throw new ApiError(400, 'Invalid or empty message. The "message" field is required.');
  }

  // Sanitize history if supplied
  const sanitizedHistory = Array.isArray(history)
    ? history
        .filter((m) => m && typeof m === 'object' && m.role && m.content)
        .map((m) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: String(m.content).trim()
        }))
    : [];

  const result = await generateMenteeReply({
    message: message.trim(),
    sessionId: typeof sessionId === 'string' && sessionId.trim() ? sessionId.trim() : undefined,
    history: sanitizedHistory,
    channel: typeof channel === 'string' ? channel : 'website',
    context: typeof context === 'object' && context !== null ? context : {}
  });

  return res.status(200).json({
    success: true,
    reply: result.reply,
    suggestedActions: result.suggestedActions || [],
    sessionId: result.sessionId,
    data: result
  });
});

module.exports = {
  chat
};
