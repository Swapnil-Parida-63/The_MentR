/**
 * @file index.js
 * @description Unified Export Index for Mentee AI Prompts.
 */

const { MENTEE_PERSONA_PROMPT } = require('./mentee-persona.prompt');
const { PromptBuilder, promptBuilder } = require('./prompt.builder');

module.exports = {
  MENTEE_PERSONA_PROMPT,
  PromptBuilder,
  promptBuilder
};
