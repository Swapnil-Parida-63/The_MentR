/**
 * @file chat.service.js
 * @description Core Conversational Service for Mentee AI Subsystem with Active Memory.
 * 
 * RESPONSIBILITY:
 * High-level orchestration of chat completions. Integrates active session memory & entity extraction
 * via `conversationManager`, RAG vector search via `retrievalService`, master prompt assembly via
 * `contextIntegrator`, and LLM execution via `aiProviderFactory`.
 * 
 * CONNECTIONS:
 * - Called by `ai.controller.js`.
 * - Uses `conversationManager` from `../memory/conversation.manager`.
 * - Uses `contextIntegrator` from `../prompts/context.integrator`.
 * - Uses `retrievalService` from `./retrieval.service`.
 * - Uses `aiProviderFactory` from `../providers`.
 */

const { aiProviderFactory } = require('../providers');
const { contextIntegrator } = require('../prompts/context.integrator');
const { conversationManager } = require('../memory/conversation.manager');
const retrievalService = require('./retrieval.service');

class ChatService {
  constructor(
    providerFactory = aiProviderFactory,
    cIntegrator = contextIntegrator,
    cManager = conversationManager,
    retriever = retrievalService
  ) {
    this.providerFactory = providerFactory;
    this.contextIntegrator = cIntegrator;
    this.conversationManager = cManager;
    this.retrievalService = retriever;
  }

  /**
   * Process a user chat message and generate an AI completion response with active session memory & RAG.
   * 
   * @param {Object} params
   * @param {string} params.sessionId - Unique conversation session ID.
   * @param {string} params.message - Raw text prompt from user.
   * @param {Array<Object>} [params.history=[]] - Optional conversation history array from client.
   * @param {string} [params.channel='website'] - Originating platform (website/ios/android/desktop).
   * @param {Object} [params.context={}] - Additional client metadata or user context.
   * @returns {Promise<Object>} Standardized chat completion response object.
   */
  async processChatMessage({ sessionId, message, history = [], channel = 'website', context = {} }) {
    // 1. Get or restore active conversation session state
    const session = await this.conversationManager.getOrRestoreSession({
      sessionId,
      clientChannel: channel,
      userId: context.userId
    });

    // 2. Persist incoming user message to database & trigger entity extraction
    await this.conversationManager.addMessage({
      sessionId,
      role: 'user',
      content: message
    });

    // 3. Fetch recent session history from database if client didn't supply it
    const activeHistory = (history && history.length > 0)
      ? history
      : await this.conversationManager.getRecentHistory(sessionId);

    // 4. Perform RAG Vector Search over MongoDB Atlas Vector Search Repository
    const ragResult = await this.retrievalService.searchKnowledge({
      query: message,
      category: context.category,
      topK: context.topK
    });

    // 5. Get active AI Provider instance from Factory (e.g. OpenAIProvider/Groq)
    const provider = this.providerFactory.getProvider();

    // 6. Build unified LLM payload combining persona, entities, workflow state, RAG context & history
    const llmMessages = this.contextIntegrator.buildUnifiedPayload({
      userMessage: message,
      sessionState: session,
      contextString: ragResult.contextString,
      history: activeHistory
    });

    // 7. Delegate execution to AI Provider abstraction layer
    const result = await provider.generateCompletion({
      messages: llmMessages,
      options: context.options || {}
    });

    // 8. Persist assistant reply to database history
    await this.conversationManager.addMessage({
      sessionId,
      role: 'assistant',
      content: result.reply,
      metadata: {
        model: result.model || 'llama-3.3-70b-versatile',
        ragDocsCount: String(ragResult.contextDocsCount || 0)
      }
    });

    // 9. Format standardized response payload with active session summary
    return {
      sessionId,
      reply: result.reply,
      retrievedContextCount: ragResult.contextDocsCount || 0,
      retrievedSources: ragResult.docTitles || [],
      suggestedActions: result.suggestedActions || ['Find a Tutor', 'Book Assessment', 'Fees & Pricing', 'Contact Support'],
      extractedEntities: session.extractedEntities || {},
      sessionState: {
        role: session.currentRole || 'unknown',
        currentWorkflow: session.currentWorkflow || 'general',
        status: session.status || 'active'
      },
      tokenUsage: result.tokenUsage || { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      metadata: {
        channel,
        model: result.model || 'llama-3.3-70b-versatile',
        finishReason: result.finishReason || 'stop',
        provider: provider.name,
        ragDurationMs: ragResult.durationMs || 0,
        isMockResponse: Boolean(result.isMockResponse)
      }
    };
  }

  /**
   * Stream chat completion response via AI Provider (interface for future streaming).
   * 
   * @param {Object} params
   * @param {Function} onChunk - Callback for incremental response chunks.
   * @returns {Promise<void>}
   */
  async streamChatMessage({ sessionId, message, history = [] }, onChunk) {
    const provider = this.providerFactory.getProvider();
    const session = await this.conversationManager.getOrRestoreSession({ sessionId });
    const ragResult = await this.retrievalService.searchKnowledge({ query: message });
    const llmMessages = this.contextIntegrator.buildUnifiedPayload({
      userMessage: message,
      sessionState: session,
      contextString: ragResult.contextString,
      history
    });

    await provider.streamCompletion({ messages: llmMessages }, onChunk);
  }
}

module.exports = new ChatService();
