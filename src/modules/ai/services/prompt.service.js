/**
 * @file prompt.service.js
 * @description System Prompt Management & Template Builder Service Placeholder.
 * 
 * RESPONSIBILITY:
 * Manages system instruction templates, persona definitions, and context insertion rules for Mentee.
 * 
 * FUTURE PURPOSE:
 * Assembles system prompts, RAG context snippets, user role parameters, and tool/function call schemas
 * into structured messages ready for LLM processing.
 * 
 * CONNECTIONS:
 * - Reads prompt version settings from `ai.config.js`.
 * - Used by `chat.service.js` and `booking.service.js`.
 */

const { aiConfig } = require('../config/ai.config');

class PromptService {
  /**
   * Constructs the full messages array (system persona + RAG context + chat history + user query)
   * 
   * @param {Object} params
   * @param {string} params.userMessage - Current prompt from user.
   * @param {Array<Object>} [params.history=[]] - Prior conversation messages.
   * @param {Array<Object>} [params.contextDocs=[]] - Retrieved RAG knowledge chunks.
   * @param {string} [params.intent='general'] - Current conversation intent.
   * @returns {Array<Object>} Structured array of LLM messages.
   */
  buildPromptMessages({ userMessage, history = [], contextDocs = [], intent = 'general' }) {
    // TODO: Load prompt template corresponding to `aiConfig.promptVersion` and `intent`
    const systemPrompt = this.getSystemPersona(intent);
    const formattedContext = this.formatContextDocuments(contextDocs);

    return [
      {
        role: 'system',
        content: `${systemPrompt}\n\n[RETRIEVED KNOWLEDGE CONTEXT]\n${formattedContext}`
      },
      ...history,
      {
        role: 'user',
        content: userMessage
      }
    ];
  }

  /**
   * Retrieves the base system persona instructions.
   * 
   * @param {string} [intent='general']
   * @returns {string} System prompt text.
   */
  getSystemPersona(intent = 'general') {
    // TODO: Extend with localized persona text and tone parameters.
    return `You are Mentee, the official AI learning advisor for TheMentR platform (${aiConfig.systemPersona}). Intent: ${intent}.`;
  }

  /**
   * Formats RAG documents into structured text blocks for the system context window.
   * 
   * @param {Array<Object>} contextDocs
   * @returns {string} Formatted context string.
   */
  formatContextDocuments(contextDocs = []) {
    if (!contextDocs || contextDocs.length === 0) {
      return 'No specific background documents retrieved.';
    }
    // TODO: Format document snippets with category labels and reference source tags.
    return contextDocs.map((doc, idx) => `[Doc ${idx + 1} - ${doc.category || 'General'}]: ${doc.content}`).join('\n\n');
  }
}

module.exports = new PromptService();
