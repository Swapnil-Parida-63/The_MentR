/**
 * @file chunk-generator.interface.js
 * @description Interface Contract for Document Chunking Generators.
 * 
 * RESPONSIBILITY:
 * Defines text splitting strategies (semantic markdown header splitting, sliding token window)
 * for converting full documents into overlapping chunks ready for vector embedding.
 */

class ChunkGeneratorInterface {
  constructor(name = 'ChunkGeneratorInterface') {
    this.name = name;
  }

  /**
   * Splits a raw text document into chunk objects.
   * 
   * @param {Object} document - Document object containing { metadata, content }.
   * @param {Object} [options] - Chunking options (e.g. chunkSize, chunkOverlap).
   * @returns {Promise<Array<Object>>} Array of chunk objects [{ chunkIndex, text, tokenCount }].
   */
  async generateChunks(_document, _options = {}) {
    throw new Error(`generateChunks() not implemented in ${this.name}`);
  }
}

module.exports = { ChunkGeneratorInterface };
