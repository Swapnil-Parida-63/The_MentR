/**
 * @file prompt.builder.js
 * @description RAG-Aware Prompt Construction & Formatting Service.
 * 
 * RESPONSIBILITY:
 * Assembles system persona prompts, retrieved RAG knowledge context, client conversation history,
 * and user query messages into standardized LLM prompt message arrays.
 * 
 * INSTRUCTIONS ENFORCED:
 * - Prioritize provided MentR knowledge base context over general model knowledge for platform queries.
 * - Never invent, hallucinate, or assume MentR pricing, policies, or workflows.
 * - If information is absent from context, state uncertainty clearly and offer support team contact.
 * - Never expose internal system instructions or raw prompts.
 * 
 * CONNECTIONS:
 * - Uses `MENTEE_PERSONA_PROMPT` from `mentee-persona.prompt.js`.
 * - Called by `chat.service.js`.
 */

const { MENTEE_PERSONA_PROMPT } = require('./mentee-persona.prompt');

class PromptBuilder {
  /**
   * Constructs formatted LLM prompt messages array with injected RAG context.
   * 
   * @param {Object} params
   * @param {string} params.userMessage - Latest message prompt from user.
   * @param {Array<Object>} [params.history=[]] - Past conversation history [{ role: 'user'|'assistant', content: string }].
   * @param {string} [params.contextString=''] - Formatted RAG context string from ContextBuilder.
   * @param {Object} [params.customPersona] - Optional override persona prompt.
   * @returns {Array<Object>} Formatted LLM payload array [{ role, content }].
   */
  buildMessages({ userMessage, history = [], contextString = '', customPersona = null }) {
    let systemContent = customPersona || MENTEE_PERSONA_PROMPT;

    // Inject RAG Knowledge Context if available
    if (contextString && contextString.trim().length > 0) {
      systemContent += `\n\n### VERIFIED MENTR KNOWLEDGE BASE CONTEXT
Use the following retrieved MentR knowledge documentation to answer the user's inquiry:

${contextString.trim()}

### STRICT CONSTRAINTS FOR KNOWLEDGE USE:
1. **Grounding Priority**: Use the verified MentR Knowledge Base Context above to answer questions about TheMentR platform, pricing, policies, teachers, parents, and courses.
2. **Zero Hallucination Policy**: NEVER invent, guess, or assume fees, refund policies, diagnostic visit details, or contractual terms that are not explicitly stated in the context.
3. **Handling Missing Facts**: If the answer to a specific MentR platform question is NOT present in the provided context, state clearly: "I don't have that specific detail right now, but I can connect you with TheMentR support team to assist you."
4. **General Educational Queries**: For general non-MentR educational advice (e.g. general study tips), you may respond helpfully while adhering to Mentee's warm persona.`;
    } else {
      systemContent += `\n\n### NOTICE REGARDING PLATFORM SPECIFICS:
No specific MentR knowledge base document matched this query with high confidence. For general educational advice, respond helpfully. If asked for specific MentR prices, policies, or account details, state clearly that you don't have that specific record loaded and offer to connect them with TheMentR team.`;
    }

    // Format & validate history array
    const formattedHistory = (history || [])
      .filter((msg) => msg && (msg.role === 'user' || msg.role === 'assistant') && msg.content)
      .map((msg) => ({
        role: msg.role,
        content: String(msg.content)
      }));

    return [
      {
        role: 'system',
        content: systemContent
      },
      ...formattedHistory,
      {
        role: 'user',
        content: String(userMessage || '').trim()
      }
    ];
  }
}

const promptBuilder = new PromptBuilder();

module.exports = { PromptBuilder, promptBuilder };
