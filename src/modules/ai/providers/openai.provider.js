/**
 * @file openai.provider.js
 * @description OpenAI Implementation of BaseAIProvider.
 * 
 * RESPONSIBILITY:
 * Communicates directly with the OpenAI Chat Completions API over HTTP. This is the ONLY place in the backend
 * that communicates with OpenAI.
 * 
 * FUTURE PURPOSE:
 * Manages model execution, request timeouts, rate limit retries, token usage metadata parsing,
 * and error sanitization.
 * 
 * CONNECTIONS:
 * - Extends `BaseAIProvider`.
 * - Reads configuration from `src/modules/ai/config/ai.config.js`.
 * - Instantiated by `ai-provider.factory.js`.
 */

const { BaseAIProvider } = require('./base-ai.provider');
const { aiConfig } = require('../config/ai.config');

class OpenAIProvider extends BaseAIProvider {
  constructor(config = {}) {
    super('OpenAIProvider');
    this.apiKey = config.openAiApiKey || aiConfig.openAiApiKey;
    this.model = config.model || aiConfig.model;
    this.baseUrl = config.baseUrl || aiConfig.baseUrl || 'https://api.openai.com/v1';
    this.timeoutMs = config.timeoutMs || aiConfig.timeoutMs || 30000;
    this.maxTokens = config.maxTokens || aiConfig.maxTokens || 1024;
    this.temperature = config.temperature !== undefined ? config.temperature : aiConfig.temperature;
  }

  /**
   * Sends chat completion request to OpenAI API.
   * 
   * @param {Object} params
   * @param {Array<Object>} params.messages - Array of { role, content } messages.
   * @param {Object} [params.options] - Optional runtime overrides.
   * @returns {Promise<Object>} Standardized result object { reply, tokenUsage, model, finishReason }
   */
  async generateCompletion({ messages, options = {} }) {
    if (!this.apiKey) {
      // Return clean fallback response when OPENAI_API_KEY is not configured yet
      return {
        reply: "Hello! I'm Mentee, your personal AI learning advisor. (API key is not configured in environment settings yet, running in sandbox mode).",
        tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
        model: this.model,
        finishReason: 'sandbox_fallback',
        isMockResponse: true
      };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs || this.timeoutMs);

    const endpoint = `${this.baseUrl.replace(/\/$/, '')}/chat/completions`;

    const requestBody = {
      model: options.model || this.model,
      messages,
      max_tokens: options.maxTokens || this.maxTokens,
      temperature: options.temperature !== undefined ? options.temperature : this.temperature
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return this.handleApiErrorResponse(response);
      }

      const data = await response.json();
      const choice = data.choices?.[0];

      return {
        reply: choice?.message?.content || 'I apologize, but I could not generate a response right now.',
        tokenUsage: {
          promptTokens: data.usage?.prompt_tokens || 0,
          completionTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0
        },
        model: data.model || this.model,
        finishReason: choice?.finish_reason || 'stop',
        isMockResponse: false
      };
    } catch (err) {
      clearTimeout(timeoutId);
      return this.handleNetworkError(err);
    }
  }

  /**
   * Handles non-2xx HTTP responses from OpenAI API safely.
   */
  async handleApiErrorResponse(response) {
    const status = response.status;
    let errorDetail = '';

    try {
      const errJson = await response.json();
      errorDetail = errJson?.error?.message || '';
    } catch (_e) {
      // Ignore JSON parse errors on response body
    }

    // Technical logging (without exposing API keys or user PII)
    console.error(`[AI Engine] OpenAI API Error Status ${status}: ${errorDetail || 'Unknown Error'}`);

    if (status === 401) {
      return {
        reply: "Mentee is undergoing system maintenance. Please try again shortly.",
        errorType: 'authentication_error',
        tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
      };
    }

    if (status === 429) {
      return {
        reply: "Mentee is receiving high volume right now. Please wait a moment and try asking again.",
        errorType: 'rate_limit_exceeded',
        tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
      };
    }

    return {
      reply: "I am having trouble processing your query right now. Please try again in a moment.",
      errorType: 'api_error',
      tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
    };
  }

  /**
   * Handles network, connection, or timeout errors safely.
   */
  handleNetworkError(err) {
    if (err.name === 'AbortError') {
      console.error('[AI Engine] OpenAI Request Timed Out');
      return {
        reply: "Mentee took too long to respond. Please try asking a shorter question.",
        errorType: 'timeout',
        tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
      };
    }

    console.error('[AI Engine] OpenAI Network Failure:', err.message);
    return {
      reply: "I'm having trouble connecting to the network right now. Please try again in a moment.",
      errorType: 'network_failure',
      tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
    };
  }

  /**
   * Stream completion implementation placeholder for SSE/WebSockets.
   */
  async streamCompletion({ messages, options = {} }, onChunk) {
    // Stream interface placeholder for future token streaming
    onChunk({ type: 'token', content: '[STREAMING NOT CONFIGURED YET]' });
    onChunk({ type: 'done' });
  }
}

module.exports = { OpenAIProvider };
