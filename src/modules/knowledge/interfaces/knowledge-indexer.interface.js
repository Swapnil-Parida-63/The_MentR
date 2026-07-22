/**
 * @file knowledge-indexer.interface.js
 * @description Interface Contract for Knowledge Pipeline Indexers.
 * 
 * RESPONSIBILITY:
 * Orchestrates the full indexing workflow: `Loader -> Validator -> ChunkGenerator -> EmbeddingGenerator -> VectorRepository`.
 */

class KnowledgeIndexerInterface {
  constructor(name = 'KnowledgeIndexerInterface') {
    this.name = name;
  }

  /**
   * Runs the full automated indexing pipeline over a category or document directory.
   * 
   * @param {Object} [options] - Category filter, force re-index flags.
   * @returns {Promise<Object>} Summary report { processedDocs, indexedChunks, errors }.
   */
  async runIndexingPipeline(_options = {}) {
    throw new Error(`runIndexingPipeline() not implemented in ${this.name}`);
  }
}

module.exports = { KnowledgeIndexerInterface };
