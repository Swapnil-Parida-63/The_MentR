/**
 * @file openai.service.js
 * @description Centralized, reusable OpenAI Client and execution service.
 *
 * RESPONSIBILITY:
 * - Initializes and exports a singleton OpenAI client instance.
 * - Reads OPENAI_API_KEY and OPENAI_MODEL safely from process.env.
 * - Enforces clean server-side configuration error if OPENAI_API_KEY is missing.
 * - Provides standardized, sanitized error handling without exposing secrets.
 */

const OpenAI = require('openai');
const { ApiError } = require('../utils/api-error');

let clientInstance = null;
let currentKey = null;

/**
 * Returns a cached singleton instance of the official OpenAI SDK client.
 * Throws a configuration error if OPENAI_API_KEY is not defined.
 *
 * @returns {OpenAI} OpenAI client instance
 */
function getOpenAIClient() {
  const apiKey = (process.env.OPENAI_API_KEY || '').trim();
  const baseURL = (process.env.OPENAI_BASE_URL || '').trim();

  if (!apiKey) {
    throw new ApiError(
      500,
      'OpenAI API key is missing on the server. Please set OPENAI_API_KEY in your backend .env file.'
    );
  }

  const configSignature = `${apiKey}:::${baseURL}`;

  // Re-instantiate only if key or baseURL has changed during runtime or instance does not exist
  if (!clientInstance || currentKey !== configSignature) {
    const clientOptions = {
      apiKey: apiKey
    };

    if (baseURL && baseURL !== 'https://api.openai.com/v1') {
      clientOptions.baseURL = baseURL;
    }

    clientInstance = new OpenAI(clientOptions);
    currentKey = configSignature;
  }

  return clientInstance;
}

/**
 * Sanitizes and handles OpenAI API errors safely without leaking credentials.
 *
 * @param {Error} err - Error from OpenAI SDK or network
 * @throws {ApiError} Sanitized ApiError
 */
function handleOpenAiError(err) {
  if (err instanceof ApiError) {
    throw err;
  }

  // Server-side technical log (sanitized, zero credentials leaked)
  console.error('[OpenAI Service Error]:', {
    name: err.name || 'Error',
    status: err.status || err.statusCode,
    code: err.code,
    message: err.message
  });

  if (err.status === 401 || err.code === 'invalid_api_key') {
    throw new ApiError(
      502,
      'OpenAI authentication failed. Please check the server OPENAI_API_KEY configuration.'
    );
  }

  if (err.status === 429 || err.code === 'rate_limit_exceeded' || err.code === 'credit_balance_exhausted') {
    if (err.code === 'credit_balance_exhausted' || err.message?.includes('credits')) {
      throw new ApiError(
        429,
        'Your OpenAI account credit balance is exhausted ($0.00). Please add billing credits at https://platform.openai.com/settings/organization/billing/ to enable Mentee responses.'
      );
    }
    throw new ApiError(
      429,
      'OpenAI rate limit exceeded. Please wait a moment and try again.'
    );
  }

  if (err.status === 404 || err.code === 'model_not_found') {
    const modelName = process.env.OPENAI_MODEL || 'gpt-5.6-luna';
    throw new ApiError(
      502,
      `The configured OpenAI model "${modelName}" was not found or is inaccessible with the provided API key.`
    );
  }

  if (err.code === 'ETIMEDOUT' || err.name === 'AbortError' || err.status === 408) {
    throw new ApiError(504, 'Request to OpenAI timed out. Please try again.');
  }

  throw new ApiError(502, 'Failed to generate response from OpenAI. Please try again shortly.');
}

module.exports = {
  getOpenAIClient,
  handleOpenAiError
};
