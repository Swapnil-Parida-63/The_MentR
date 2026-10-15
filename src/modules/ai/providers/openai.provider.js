/**
 * @file openai.provider.js
 * @description OpenAI Implementation of BaseAIProvider using the centralized OpenAI Service.
 * 
 * RESPONSIBILITY:
 * Reuses the official OpenAI SDK client from `src/services/openai.service.js`.
 * Manages model execution with fallback (e.g. gpt-5.6-luna -> gpt-4o-mini), timeouts,
 * token usage metadata parsing, and error sanitization.
 * 
 * CONNECTIONS:
 * - Extends `BaseAIProvider`.
 * - Reuses `getOpenAIClient` and `handleOpenAiError` from `src/services/openai.service.js`.
 * - Reads configuration from `src/modules/ai/config/ai.config.js`.
 * - Instantiated by `ai-provider.factory.js`.
 */

const { BaseAIProvider } = require('./base-ai.provider');
const { aiConfig } = require('../config/ai.config');
const { getOpenAIClient, handleOpenAiError } = require('../../../services/openai.service');

class OpenAIProvider extends BaseAIProvider {
  constructor(config = {}) {
    super('OpenAIProvider');
    this.apiKey = config.openAiApiKey || aiConfig.openAiApiKey;
    this.model = config.model || aiConfig.model || process.env.OPENAI_MODEL || 'gpt-5.6-luna';
    this.baseUrl = config.baseUrl || aiConfig.baseUrl || 'https://api.openai.com/v1';
    this.timeoutMs = config.timeoutMs || aiConfig.timeoutMs || 30000;
    this.maxTokens = config.maxTokens || aiConfig.maxTokens || 1024;
    this.temperature = config.temperature !== undefined ? config.temperature : aiConfig.temperature;
  }

  /**
   * Sends chat completion request to OpenAI API using the centralized OpenAI client.
   * 
   * @param {Object} params
   * @param {Array<Object>} params.messages - Array of { role, content } messages.
   * @param {Object} [params.options] - Optional runtime overrides.
   * @returns {Promise<Object>} Standardized result object { reply, tokenUsage, model, finishReason }
   */
  async generateCompletion({ messages, options = {} }) {
    const apiKey = options.apiKey || this.apiKey || aiConfig.openAiApiKey || (process.env.OPENAI_API_KEY || '').trim();
    const primaryModel = options.model || this.model || aiConfig.model || process.env.OPENAI_MODEL || 'gpt-5.6-luna';

    if (!apiKey) {
      return {
        reply: "Hello! I'm Mentee, your personal AI learning advisor. (API key is not configured in environment settings yet, running in sandbox mode).",
        tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
        model: primaryModel,
        finishReason: 'sandbox_fallback',
        isMockResponse: true
      };
    }

    let client;
    try {
      client = getOpenAIClient();
    } catch (clientErr) {
      return {
        reply: "Mentee is currently in sandbox mode. How can I assist you with TheMentR today?",
        tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
        model: primaryModel,
        finishReason: 'sandbox_fallback',
        isMockResponse: true
      };
    }

    const maxTokens = options.maxTokens || this.maxTokens || 1024;
    const temperature = options.temperature !== undefined ? options.temperature : (this.temperature ?? 0.7);

    const executeCall = async (targetModel) => {
      const payload = {
        model: targetModel,
        messages,
        max_completion_tokens: maxTokens
      };

      // Only attach temperature if specified and not 1 (since reasoning models require default 1)
      if (temperature !== undefined && temperature !== 1) {
        payload.temperature = temperature;
      }

      try {
        return await client.chat.completions.create(payload);
      } catch (callErr) {
        // If model rejects custom temperature (e.g. gpt-5.x/o1 only support default 1), retry without temperature
        if (
          callErr.code === 'unsupported_value' ||
          callErr.message?.includes('temperature')
        ) {
          const noTempPayload = { ...payload };
          delete noTempPayload.temperature;
          try {
            return await client.chat.completions.create(noTempPayload);
          } catch (retryErr) {
            callErr = retryErr;
          }
        }

        // If legacy model doesn't support max_completion_tokens, fallback to max_tokens
        if (
          callErr.message?.includes('max_completion_tokens') ||
          callErr.code === 'unsupported_parameter'
        ) {
          const legacyPayload = {
            model: targetModel,
            messages,
            max_tokens: maxTokens
          };
          if (temperature !== undefined && temperature !== 1) {
            legacyPayload.temperature = temperature;
          }
          return await client.chat.completions.create(legacyPayload);
        }

        throw callErr;
      }
    };

    try {
      let completion;
      let usedModel = primaryModel;

      try {
        completion = await executeCall(primaryModel);
      } catch (primaryErr) {
        // Model fallback: If gpt-5.6-luna or another primary model returns 404 model_not_found,
        // gracefully fall back to gpt-4o-mini so the user receives a live response
        const isModelNotFound =
          primaryErr.status === 404 ||
          primaryErr.code === 'model_not_found' ||
          primaryErr.message?.includes('does not exist');

        if (isModelNotFound && primaryModel !== 'gpt-4o-mini' && primaryModel !== 'gpt-4o') {
          console.warn(
            `[AI Engine] Model "${primaryModel}" is not accessible with this API key tier. Falling back to "gpt-4o-mini"...`
          );
          try {
            completion = await executeCall('gpt-4o-mini');
            usedModel = 'gpt-4o-mini';
          } catch (_fallbackErr) {
            throw primaryErr;
          }
        } else {
          throw primaryErr;
        }
      }

      const choice = completion.choices?.[0];

      return {
        reply: choice?.message?.content || 'I apologize, but I could not generate a response right now.',
        tokenUsage: {
          promptTokens: completion.usage?.prompt_tokens || 0,
          completionTokens: completion.usage?.completion_tokens || 0,
          totalTokens: completion.usage?.total_tokens || 0
        },
        model: completion.model || usedModel,
        finishReason: choice?.finish_reason || 'stop',
        isMockResponse: false
      };
    } catch (err) {
      return this.handleErrorSafely(err);
    }
  }

  /**
   * Safe, sanitized error handler that maps errors to polite user responses
   * without exposing API keys, credentials, or internal stack traces.
   */
  handleErrorSafely(err) {
    const status = err.status || err.statusCode;
    const code = err.code;
    const message = err.message || '';

    console.error('[AI Engine] OpenAI Error:', { status, code, message });

    if (status === 401 || code === 'invalid_api_key') {
      return {
        reply: "Mentee is undergoing system maintenance. Please try again shortly.",
        errorType: 'authentication_error',
        tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
      };
    }

    if (status === 429 || code === 'rate_limit_exceeded') {
      return {
        reply: "Mentee is receiving high volume right now. Please wait a moment and try asking again.",
        errorType: 'rate_limit_exceeded',
        tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
      };
    }

    if (code === 'ETIMEDOUT' || err.name === 'AbortError' || status === 408) {
      return {
        reply: "Mentee took a little too long to respond. Please try asking a shorter question or reach out at contact@thementr.com.",
        errorType: 'timeout',
        tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
      };
    }

    return {
      reply: "I am having trouble processing your query right now. Please try again in a moment or contact our support team at contact@thementr.com.",
      errorType: 'api_error',
      tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
    };
  }

  /**
   * Stream completion implementation placeholder for SSE/WebSockets.
   */
  async streamCompletion({ messages, options = {} }, onChunk) {
    onChunk({ type: 'token', content: '[STREAMING NOT CONFIGURED YET]' });
    onChunk({ type: 'done' });
  }
}

module.exports = { OpenAIProvider };
