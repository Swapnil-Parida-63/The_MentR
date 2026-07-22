/**
 * @file embedding-generator.interface.js
 * @description Interface Contract for Embedding Generators.
 * 
 * RESPONSIBILITY:
 * Defines standard methods for computing high-dimensional vector embeddings for text chunks.
 */

class EmbeddingGeneratorInterface {
  constructor(name = 'EmbeddingGeneratorInterface') {
    this.name = name;
  }

  /**
   * Generates a vector embedding array for a text string.
   * 
   * @param {string} text - Input text snippet.
   * @returns {Promise<Array<number>>} High-dimensional vector array.
   */
  async generateEmbedding(_text) {
    throw new Error(`generateEmbedding() not implemented in ${this.name}`);
  }

  /**
   * Batch generates vector embeddings for multiple text snippets.
   * 
   * @param {Array<string>} textList - List of text strings.
   * @returns {Promise<Array<Array<number>>>} List of vector arrays.
   */
  async generateBatchEmbeddings(_textList) {
    throw new Error(`generateBatchEmbeddings() not implemented in ${this.name}`);
  }
}

module.exports = { EmbeddingGeneratorInterface };
