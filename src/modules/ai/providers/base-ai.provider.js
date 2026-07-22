/**
 * @file base-ai.provider.js
 * @description Abstract Base Class for AI Model Providers.
 * 
 * RESPONSIBILITY:
 * Defines the standard contract that all AI provider implementations (OpenAI, Claude, Gemini, Local LLM)
 * must implement.
 * 
 * FUTURE PURPOSE:
 * Ensures the rest of the backend remains completely decoupled from specific LLM SDK vendor implementations.
 * 
 * CONNECTIONS:
 * - Extended by `OpenAIProvider`.
 * - Instantiated via `aiProviderFactory`.
 */

class BaseAIProvider {
  constructor(name = 'BaseAIProvider') {
    this.name = name;
  }

  /**
   * Generates a non-streaming chat completion.
   * 
   * @param {Object} params
   * @param {Array<Object>} params.messages - Array of { role, content } message objects.
   * @param {Object} [params.options] - Overrides for temperature, maxTokens, model, etc.
   * @returns {Promise<Object>} Standardized response { reply, tokenUsage, model, finishReason }
   */
  async generateCompletion({ messages, options = {} }) {
    throw new Error(`generateCompletion() not implemented in ${this.name}`);
  }

  /**
   * Streams a chat completion response via callback.
   * 
   * @param {Object} params
   * @param {Array<Object>} params.messages - Array of { role, content } message objects.
   * @param {Object} [params.options] - Model options.
   * @param {Function} onChunk - Callback receiving ({ type: 'token'|'done'|'error', content })
   * @returns {Promise<void>}
   */
  async streamCompletion({ messages, options = {} }, onChunk) {
    throw new Error(`streamCompletion() not implemented in ${this.name}`);
  }
}

module.exports = { BaseAIProvider };
