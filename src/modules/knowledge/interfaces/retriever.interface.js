/**
 * @file retriever.interface.js
 * @description Interface Contract for RAG Context Retrievers.
 * 
 * RESPONSIBILITY:
 * Defines standard RAG context retrieval for conversational AI endpoints (e.g. `Mentee`).
 */

class RetrieverInterface {
  constructor(name = 'RetrieverInterface') {
    this.name = name;
  }

  /**
   * Retrieves relevant knowledge document chunks matching a user query string.
   * 
   * @param {string} query - Raw user query prompt.
   * @param {Object} [options] - Category filter, topK limit, score threshold.
   * @returns {Promise<Array<Object>>} List of retrieved context document objects.
   */
  async retrieveContext(_query, _options = {}) {
    throw new Error(`retrieveContext() not implemented in ${this.name}`);
  }
}

module.exports = { RetrieverInterface };
