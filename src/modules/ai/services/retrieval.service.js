/**
 * @file retrieval.service.js
 * @description Production RAG Knowledge Retrieval Service for Mentee AI.
 * 
 * RESPONSIBILITY:
 * Orchestrates vector search over MongoDB Atlas Vector Search index. Generates query embeddings,
 * queries vector repositories, filters by similarity threshold, formats RAG context, and logs metrics.
 * 
 * FEATURES:
 * - Implements `RetrieverInterface`.
 * - Uses `EmbeddingService`, `MongoVectorRepository`, and `ContextBuilder`.
 * - Measures and logs technical retrieval latency, chunk counts, and match scores.
 * 
 * CONNECTIONS:
 * - Called by `chat.service.js`.
 */

const { RetrieverInterface } = require('../../knowledge/interfaces/retriever.interface');
const embeddingService = require('./embedding.service');
const { MongoVectorRepository } = require('../../knowledge/vector/mongo-vector.repository');
const { contextBuilder } = require('../prompts/context.builder');
const { aiConfig } = require('../config/ai.config');

class RetrievalService extends RetrieverInterface {
  constructor(
    embService = embeddingService,
    vecRepo = new MongoVectorRepository(),
    ctxBuilder = contextBuilder
  ) {
    super('RetrievalService');
    this.embeddingService = embService;
    this.vectorRepository = vecRepo;
    this.contextBuilder = ctxBuilder;
  }

  /**
   * Search vector index for knowledge chunks relevant to the user query string.
   * 
   * @param {Object} params
   * @param {string} params.query - User query text.
   * @param {string} [params.category] - Optional category filter.
   * @param {number} [params.topK] - Max documents to retrieve.
   * @param {number} [params.scoreThreshold] - Minimum similarity score.
   * @returns {Promise<Object>} Search result object { contextString, contextDocsCount, docTitles, chunks, durationMs }.
   */
  async searchKnowledge({ query, category, topK, scoreThreshold }) {
    const startTime = Date.now();
    const limit = topK || aiConfig.maxContextDocuments || 5;
    const threshold = scoreThreshold !== undefined ? scoreThreshold : aiConfig.similarityThreshold || 0.65;

    if (!query || !query.trim()) {
      return {
        contextString: '',
        contextDocsCount: 0,
        docTitles: [],
        chunks: [],
        durationMs: 0
      };
    }

    try {
      // 1. Generate query vector embedding using OpenAI Embeddings API
      const queryVector = await this.embeddingService.generateEmbedding(query.trim());

      // 2. Perform similarity search in MongoDB Atlas Vector Search Repository
      const rawChunks = await this.vectorRepository.searchSimilarity(queryVector, {
        topK: limit,
        category,
        scoreThreshold: threshold
      });

      // 3. Build & format RAG context block via ContextBuilder
      const builtContext = this.contextBuilder.buildContext(rawChunks, {
        maxDocs: limit,
        minScore: threshold
      });

      const durationMs = Date.now() - startTime;

      // Technical logging: log retrieval timing & match scores without logging PII/queries
      const scores = rawChunks.map((c) => Number((c.score || 0).toFixed(3)));
      if (process.env.NODE_ENV === 'development' || rawChunks.length > 0) {
        console.log(`[RAG Retrieval] Matched ${builtContext.contextDocsCount} chunks in ${durationMs}ms (Scores: [${scores.join(', ')}])`);
      }

      return {
        contextString: builtContext.formattedContext,
        contextDocsCount: builtContext.contextDocsCount,
        docTitles: builtContext.docTitles,
        chunks: rawChunks,
        durationMs
      };
    } catch (err) {
      const durationMs = Date.now() - startTime;
      console.error(`[RAG Retrieval Error] Vector retrieval failed after ${durationMs}ms:`, err.message);
      return {
        contextString: '',
        contextDocsCount: 0,
        docTitles: [],
        chunks: [],
        durationMs
      };
    }
  }

  /**
   * Retrieves context string directly matching RetrieverInterface contract.
   */
  async retrieveContext(query, options = {}) {
    const result = await this.searchKnowledge({ query, ...options });
    return result.chunks;
  }
}

module.exports = new RetrievalService();
