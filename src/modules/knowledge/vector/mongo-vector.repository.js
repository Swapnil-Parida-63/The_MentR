/**
 * @file mongo-vector.repository.js
 * @description MongoDB Atlas Vector Search Repository Implementation.
 * 
 * RESPONSIBILITY:
 * Manages vector store CRUD operations on the Mongoose `KmsChunk` collection.
 * Executes `$vectorSearch` aggregation queries on MongoDB Atlas vector search indexes with fallback
 * cosine similarity search for local/testing environments.
 * 
 * FEATURES:
 * - Implements `VectorRepositoryInterface`.
 * - Reuses existing MongoDB connection via Mongoose.
 * - Supports `$vectorSearch` pipeline stage and category metadata filtering.
 */

const { VectorRepositoryInterface } = require('../interfaces/vector-repository.interface');
const { KmsChunk } = require('../models/kms-chunk.model');
const { aiConfig } = require('../../ai/config/ai.config');

class MongoVectorRepository extends VectorRepositoryInterface {
  constructor() {
    super('MongoVectorRepository');
    this.chunkModel = KmsChunk;
    this.indexName = aiConfig.vectorIndex || 'mentee-knowledge-base';
  }

  /**
   * Upserts chunk vector records into MongoDB.
   * 
   * @param {Array<Object>} records - List of { documentId, chunkIndex, heading, text, vector, metadata, contentHash }.
   * @returns {Promise<Object>} Result summary { upsertedCount: number }.
   */
  async upsertVectors(records = []) {
    if (!records || records.length === 0) {
      return { upsertedCount: 0 };
    }

    let count = 0;
    for (const rec of records) {
      await this.chunkModel.findOneAndUpdate(
        { documentId: rec.documentId, chunkIndex: rec.chunkIndex },
        {
          documentId: rec.documentId,
          chunkIndex: rec.chunkIndex,
          heading: rec.heading || '',
          text: rec.text,
          tokenCount: rec.tokenCount || 0,
          contentHash: rec.contentHash || '',
          vector: rec.vector || [],
          metadata: rec.metadata || {}
        },
        { upsert: true, new: true }
      );
      count++;
    }

    return { upsertedCount: count };
  }

  /**
   * Performs vector similarity search using MongoDB Atlas `$vectorSearch` or local fallback.
   * 
   * @param {Array<number>} queryVector - Query embedding 1536 float vector array.
   * @param {Object} [options] - Filters: category, topK, scoreThreshold.
   * @returns {Promise<Array<Object>>} List of matching chunk objects with similarity scores.
   */
  async searchSimilarity(queryVector = [], options = {}) {
    const topK = options.topK || aiConfig.maxContextDocuments || 5;
    const categoryFilter = options.category;
    const threshold = options.scoreThreshold !== undefined ? options.scoreThreshold : aiConfig.similarityThreshold || 0.65;

    try {
      // MongoDB Atlas Vector Search Pipeline Stage
      const vectorSearchStage = {
        $vectorSearch: {
          index: this.indexName,
          path: 'vector',
          queryVector: queryVector,
          numCandidates: topK * 10,
          limit: topK
        }
      };

      if (categoryFilter) {
        vectorSearchStage.$vectorSearch.filter = {
          'metadata.category': categoryFilter
        };
      }

      const pipeline = [
        vectorSearchStage,
        {
          $project: {
            _id: 1,
            documentId: 1,
            chunkIndex: 1,
            heading: 1,
            text: 1,
            metadata: 1,
            score: { $meta: 'vectorSearchScore' }
          }
        }
      ];

      const results = await this.chunkModel.aggregate(pipeline);

      if (results && results.length > 0) {
        return results
          .filter((r) => r.score >= threshold)
          .map((r) => ({
            chunkId: r._id,
            documentId: r.documentId,
            heading: r.heading,
            text: r.text,
            metadata: r.metadata,
            score: r.score
          }));
      }
    } catch (err) {
      // Fallback for local MongoDB instances where Atlas Vector Index is not built yet
      console.warn('[MongoVectorRepository] Atlas Vector Search failed or index not found. Running in-memory cosine fallback:', err.message);
    }

    return await this.fallbackCosineSearch(queryVector, topK, categoryFilter, threshold);
  }

  /**
   * Fallback cosine similarity search implementation over existing MongoDB chunks.
   */
  async fallbackCosineSearch(queryVector, topK, categoryFilter, threshold) {
    const query = categoryFilter ? { 'metadata.category': categoryFilter } : {};
    const chunks = await this.chunkModel.find(query).limit(100).lean();

    if (!chunks || chunks.length === 0) {
      return [];
    }

    const scored = chunks.map((c) => {
      const simScore = this.cosineSimilarity(queryVector, c.vector);
      return {
        chunkId: c._id,
        documentId: c.documentId,
        heading: c.heading,
        text: c.text,
        metadata: c.metadata,
        score: simScore
      };
    });

    return scored
      .filter((s) => s.score >= threshold)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  /**
   * Cosine similarity between two float vectors.
   */
  cosineSimilarity(vecA = [], vecB = []) {
    if (!vecA || !vecB || vecA.length === 0 || vecB.length === 0) return 0;
    let dot = 0;
    let normA = 0;
    let normB = 0;
    const len = Math.min(vecA.length, vecB.length);

    for (let i = 0; i < len; i++) {
      dot += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    if (normA === 0 || normB === 0) return 0;
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Deletes chunk records by document ID.
   */
  async deleteVectorsByDocumentId(documentId) {
    await this.chunkModel.deleteMany({ documentId });
  }

  /**
   * Deletes vector records by vector IDs.
   */
  async deleteVectors(vectorIds = []) {
    await this.chunkModel.deleteMany({ _id: { $in: vectorIds } });
  }
}

module.exports = { MongoVectorRepository };
