/**
 * @file mentee.controller.js
 * @description Express Controller for Mentee Chatbot endpoints.
 */

const { asyncHandler } = require('../../utils/async-handler');
const { ApiError } = require('../../utils/api-error');
const { generateMenteeReply } = require('./mentee.service');

/**
 * Handle Mentee chat messages.
 *
 * @route POST /api/mentee/chat (and /api/v1/mentee/chat)
 * @body { "message": "string" }
 * @returns { "success": true, "reply": "string" }
 */
const chat = asyncHandler(async (req, res) => {
  const { message } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    throw new ApiError(400, 'Invalid or empty message. The "message" field is required.');
  }

  const result = await generateMenteeReply({
    message: message.trim()
  });

  return res.status(200).json({
    success: true,
    reply: result.reply
  });
});

module.exports = {
  chat
};
