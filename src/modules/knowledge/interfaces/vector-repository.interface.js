/**
 * @file vector-repository.interface.js
 * @description Interface Contract for Vector Database Repositories.
 * 
 * RESPONSIBILITY:
 * Defines standard CRUD operations for vector stores (Pinecone, Qdrant, MongoDB Vector Search, Weaviate, Milvus).
 */

class VectorRepositoryInterface {
  constructor(name = 'VectorRepositoryInterface') {
    this.name = name;
  }

  /**
   * Upserts vector records into the vector database index.
   * 
   * @param {Array<Object>} records - List of { id, vector, metadata }.
   * @returns {Promise<Object>} Summary result { upsertedCount: number }.
   */
  async upsertVectors(_records) {
    throw new Error(`upsertVectors() not implemented in ${this.name}`);
  }

  /**
   * Performs vector similarity search.
   * 
   * @param {Array<number>} queryVector - Query embedding vector.
   * @param {Object} [options] - TopK, category filters, score thresholds.
   * @returns {Promise<Array<Object>>} Array of matching vector records with similarity scores.
   */
  async searchSimilarity(_queryVector, _options = {}) {
    throw new Error(`searchSimilarity() not implemented in ${this.name}`);
  }

  /**
   * Deletes vector records by IDs or metadata filter.
   * 
   * @param {Array<string>} vectorIds - Vector IDs to remove.
   * @returns {Promise<void>}
   */
  async deleteVectors(_vectorIds) {
    throw new Error(`deleteVectors() not implemented in ${this.name}`);
  }
}

module.exports = { VectorRepositoryInterface };
