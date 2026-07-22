/**
 * @file context.integrator.js
 * @description Master Prompt Context Integrator for Mentee AI.
 * 
 * RESPONSIBILITY:
 * Integrates all context streams (System Persona, Extracted Entities, User Role, Active Workflow State,
 * Retrieved RAG Knowledge, and Conversation History) into a unified LLM prompt payload.
 * 
 * CONNECTIONS:
 * - Called by `chat.service.js`.
 * - Uses `promptBuilder`.
 */

const { promptBuilder } = require('./prompt.builder');

class ContextIntegrator {
  /**
   * Assembles unified LLM prompt payload from conversation state, entities, RAG context, and history.
   * 
   * @param {Object} params
   * @param {string} params.userMessage - Latest user message prompt.
   * @param {Object} [params.sessionState] - Active session document containing entities & workflow state.
   * @param {string} [params.contextString=''] - Formatted RAG knowledge context string.
   * @param {Array<Object>} [params.history=[]] - Recent conversation message history.
   * @returns {Array<Object>} Formatted LLM payload array [{ role, content }].
   */
  buildUnifiedPayload({ userMessage, sessionState = {}, contextString = '', history = [] }) {
    let contextHeader = '';

    // 1. Format Extracted User Entities & Role Context
    const entities = sessionState.extractedEntities || {};
    const role = sessionState.currentRole || entities.role || 'unknown';
    const activeWorkflow = sessionState.currentWorkflow || 'general';
    const workflowStep = sessionState.workflowState?.step || 'init';

    const entitySummary = [];
    if (role !== 'unknown') entitySummary.push(`- **User Role**: ${role}`);
    if (entities.parentName) entitySummary.push(`- **Parent Name**: ${entities.parentName}`);
    if (entities.studentName) entitySummary.push(`- **Student Name**: ${entities.studentName}`);
    if (entities.grade) entitySummary.push(`- **Student Grade**: ${entities.grade}`);
    if (entities.board) entitySummary.push(`- **Board**: ${entities.board}`);
    if (entities.subjects && entities.subjects.length > 0) entitySummary.push(`- **Subjects**: ${entities.subjects.join(', ')}`);
    if (entities.city) entitySummary.push(`- **City**: ${entities.city}`);
    if (entities.mode) entitySummary.push(`- **Mode**: ${entities.mode}`);
    if (entities.phone) entitySummary.push(`- **Phone**: ${entities.phone}`);

    if (entitySummary.length > 0) {
      contextHeader += `\n\n### KNOWN USER CONTEXT & EXTRACTED DETAILS
The following parameters have already been confirmed in this chat session. Reuse these details naturally without asking the user to repeat them:
${entitySummary.join('\n')}\n`;
    }

    // 2. Format Active Workflow State
    if (activeWorkflow !== 'general') {
      contextHeader += `\n### ACTIVE WORKFLOW STATE
- **Active Workflow**: ${activeWorkflow}
- **Current Step**: ${workflowStep}
- **Instruction**: Guide the user smoothly through the next step of the ${activeWorkflow} process.\n`;
    }

    // 3. Append RAG Knowledge Context
    const fullContextString = `${contextHeader}\n${contextString}`.trim();

    // 4. Delegate to PromptBuilder
    return promptBuilder.buildMessages({
      userMessage,
      history,
      contextString: fullContextString
    });
  }
}

const contextIntegrator = new ContextIntegrator();

module.exports = { ContextIntegrator, contextIntegrator };
