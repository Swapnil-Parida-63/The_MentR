/**
 * @file mentee-instructions.js
 * @description System / Developer instructions for the Mentee AI Assistant.
 *
 * NOTE:
 * Kept isolated here so it can be easily updated with future RAG knowledge bases,
 * persona enhancements, and domain-specific educational guidelines.
 */

const { MENTEE_PERSONA_PROMPT } = require('../modules/ai/prompts/mentee-persona.prompt');

const MENTEE_SYSTEM_INSTRUCTION = MENTEE_PERSONA_PROMPT;

module.exports = {
  MENTEE_SYSTEM_INSTRUCTION
};
