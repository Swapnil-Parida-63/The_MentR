/**
 * @file mentee.service.js
 * @description Official Mentee AI Chat Service integrating RAG, persona, and conversation memory.
 * 
 * RESPONSIBILITY:
 * Bridges the active Mentee chatbot API to the central AI subsystem (`chatService`).
 * Ensures all chat requests utilize RAG vector retrieval over verified MentR knowledge,
 * active multi-turn session memory, brand-aligned persona guidelines, and centralized OpenAI execution.
 * 
 * CONNECTIONS:
 * - Uses `chatService` from `../ai/services/chat.service`.
 * - Called by `mentee.controller.js`.
 */

const chatService = require('../ai/services/chat.service');
const { handleOpenAiError } = require('../../services/openai.service');

/**
 * Generates an AI response for an incoming user message by invoking the full RAG pipeline.
 *
 * @param {Object} params
 * @param {string} params.message - User prompt string
 * @param {string} [params.sessionId] - Active session identifier
 * @param {Array<Object>} [params.history=[]] - Client-provided conversation history
 * @param {string} [params.channel='website'] - Platform channel
 * @param {Object} [params.context={}] - Optional metadata or overrides
 * @returns {Promise<Object>} Standardized Mentee chat response
 */
async function generateMenteeReply({
  message,
  sessionId,
  history = [],
  channel = 'website',
  context = {}
}) {
  const activeSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

  try {
    const result = await chatService.processChatMessage({
      sessionId: activeSessionId,
      message: message.trim(),
      history,
      channel,
      context
    });

    return {
      success: true,
      reply: result.reply,
      suggestedActions: result.suggestedActions || ['Find a Tutor', 'Book Assessment', 'Fees & Pricing', 'Contact Support'],
      sessionId: result.sessionId,
      retrievedContextCount: result.retrievedContextCount || 0,
      retrievedSources: result.retrievedSources || [],
      extractedEntities: result.extractedEntities || {},
      sessionState: result.sessionState || {},
      metadata: result.metadata || {}
    };
  } catch (err) {
    console.error('[Mentee Service Error]:', err.message);
    try {
      handleOpenAiError(err);
    } catch (sanitizedError) {
      throw sanitizedError;
    }
  }
}

module.exports = {
  generateMenteeReply
};
