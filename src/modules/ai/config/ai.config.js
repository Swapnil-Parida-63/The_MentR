/**
 * @file ai.config.js
 * @description Centralized Configuration Module for Mentee AI Subsystem.
 * 
 * RESPONSIBILITY:
 * Provides strongly-typed access to AI-related environment settings and system parameters.
 * 
 * FUTURE PURPOSE:
 * Serves as the single source of truth for model selection, vector indexing settings, prompt versioning,
 * and rate-limiting limits across Web, iOS, Android, and Desktop backend services.
 * 
 * CONNECTIONS:
 * - Reads parsed environment variables from `src/config/env.js`.
 * - Consumed by AI providers (`openai.provider.js`), `chat.service.js`, and `prompt.builder.js`.
 */

const { env } = require('../../../config/env');

const aiConfig = {
  /**
   * Active AI Provider Strategy ('openai' | 'claude' | 'gemini' | 'local')
   */
  provider: env.AI_PROVIDER || 'openai',

  /**
   * OpenAI API Credentials
   */
  openAiApiKey: env.OPENAI_API_KEY || '',

  /**
   * Primary LLM Model for conversational completion
   * Default: llama-3.3-70b-versatile
   */
  model: env.OPENAI_MODEL || 'llama-3.3-70b-versatile',

  /**
   * Base API URL (supports Groq / OpenAI / Azure / Ollama)
   */
  baseUrl: env.OPENAI_BASE_URL || 'https://api.groq.com/openai/v1',

  /**
   * Request Timeout in milliseconds (default: 30000ms)
   */
  timeoutMs: env.OPENAI_TIMEOUT || 30000,

  /**
   * Maximum Completion Tokens (default: 1024)
   */
  maxTokens: env.OPENAI_MAX_TOKENS || 1024,

  /**
   * Model Temperature (default: 0.7)
   */
  temperature: env.OPENAI_TEMPERATURE || 0.7,

  /**
   * Primary Embedding Model for RAG vectorization
   */
  embeddingModel: env.EMBEDDING_MODEL || 'text-embedding-3-small',

  /**
   * Vector Index / Database Namespace identifier
   */
  vectorIndex: env.VECTOR_INDEX || 'mentee-knowledge-base',

  /**
   * Current System Prompt Version
   */
  promptVersion: env.PROMPT_VERSION || 'v1.0',

  /**
   * Maximum number of relevant knowledge document chunks to retrieve per query during RAG.
   */
  maxContextDocuments: env.MAX_CONTEXT_DOCUMENTS || 5,

  /**
   * Minimum vector similarity threshold for RAG context inclusion (0.0 to 1.0)
   */
  similarityThreshold: env.RAG_SIMILARITY_THRESHOLD || 0.65,

  /**
   * System persona default identifiers
   */
  systemPersona: 'Mentee - The MentR AI Learning & Guidance Advisor',

  /**
   * Default Token, Session & Rate Limits
   */
  limits: {
    maxCompletionTokens: env.OPENAI_MAX_TOKENS || 1024,
    sessionTimeoutMinutes: env.SESSION_TIMEOUT_MINUTES || 60,
    conversationMemoryWindow: env.CONVERSATION_MEMORY_WINDOW || 20,
    maxStoredMessagesPerSession: env.MAX_STORED_MESSAGES_PER_SESSION || 100,
    rateLimitPerMinute: 60
  }
};

module.exports = { aiConfig };
