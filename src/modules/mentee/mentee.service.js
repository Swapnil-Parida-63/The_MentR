/**
 * @file mentee.service.js
 * @description Service for generating Mentee AI chat responses using OpenAI and GPT-5.6 Luna.
 */

const { getOpenAIClient, handleOpenAiError } = require('../../services/openai.service');
const { MENTEE_SYSTEM_INSTRUCTION } = require('../../config/mentee-instructions');

/**
 * Extracts plain text from OpenAI Responses API output object.
 *
 * @param {Object} response
 * @returns {string}
 */
function extractResponsesApiText(response) {
  if (!response) return '';
  if (typeof response.output_text === 'string' && response.output_text.trim()) {
    return response.output_text.trim();
  }
  if (Array.isArray(response.output)) {
    for (const item of response.output) {
      if (item.type === 'message' && Array.isArray(item.content)) {
        const textObj = item.content.find((c) => c.type === 'text' || c.text);
        if (textObj) {
          const val = textObj.text || textObj.value || '';
          if (val) return val.trim();
        }
      } else if (item.content && typeof item.content === 'string') {
        return item.content.trim();
      }
    }
  }
  return '';
}

/**
 * Generates an AI response for a user message.
 *
 * @param {Object} params
 * @param {string} params.message - User message string
 * @param {string} [params.systemInstruction] - Optional override for system prompt
 * @param {string} [params.model] - Optional override for model name
 * @returns {Promise<{ success: boolean, reply: string }>} Clean standardized reply
 */
async function generateMenteeReply({ message, systemInstruction, model: modelOverride }) {
  const client = getOpenAIClient();
  const primaryModel = modelOverride || process.env.OPENAI_MODEL || 'gpt-5.6-luna';
  const instructions = systemInstruction || MENTEE_SYSTEM_INSTRUCTION;

  /**
   * Helper to execute chat call against a specific model
   */
  async function executeCall(targetModel) {
    // 1. Attempt OpenAI Responses API
    if (typeof client.responses?.create === 'function') {
      try {
        const response = await client.responses.create({
          model: targetModel,
          instructions,
          input: message
        });

        const reply = extractResponsesApiText(response);
        if (reply) return reply;
      } catch (respErr) {
        // If responses API is unavailable or unsupported on this endpoint, continue to Chat Completions
        if (
          respErr.status === 404 ||
          respErr.status === 400 ||
          respErr.message?.includes('not found') ||
          respErr.message?.includes('unsupported')
        ) {
          // Fall through to chat completions
        } else {
          throw respErr;
        }
      }
    }

    // 2. Chat Completions API
    const completion = await client.chat.completions.create({
      model: targetModel,
      messages: [
        { role: 'system', content: instructions },
        { role: 'user', content: message }
      ]
    });

    return (
      completion.choices?.[0]?.message?.content ||
      'I apologize, but I could not generate a response at this time.'
    );
  }

  try {
    let replyText = '';

    try {
      replyText = await executeCall(primaryModel);
    } catch (primaryErr) {
      // If primary model (e.g. gpt-5.6-luna) returned 404 model_not_found on public OpenAI API key,
      // gracefully fall back to gpt-4o-mini so user gets a live response immediately
      const isModelNotFound =
        primaryErr.status === 404 ||
        primaryErr.code === 'model_not_found' ||
        primaryErr.message?.includes('does not exist');

      if (isModelNotFound && primaryModel !== 'gpt-4o-mini' && primaryModel !== 'gpt-4o') {
        console.warn(
          `[Mentee Service] Model "${primaryModel}" is not accessible with this API key tier. Falling back to "gpt-4o-mini"...`
        );
        try {
          replyText = await executeCall('gpt-4o-mini');
        } catch (_fallbackErr) {
          // If fallback also fails, throw primary error to be handled cleanly
          throw primaryErr;
        }
      } else {
        throw primaryErr;
      }
    }

    return {
      success: true,
      reply: replyText.trim()
    };
  } catch (err) {
    handleOpenAiError(err);
  }
}

module.exports = {
  generateMenteeReply
};
