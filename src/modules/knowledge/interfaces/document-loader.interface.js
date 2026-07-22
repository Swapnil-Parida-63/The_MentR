/**
 * @file document-loader.interface.js
 * @description Interface Contract for KMS Document Loaders.
 * 
 * RESPONSIBILITY:
 * Defines standard methods for discovering, loading, and parsing raw document files from disk, CMS, or remote API sources.
 * 
 * FUTURE PURPOSE:
 * Implemented by filesystem loaders, CMS integration connectors, or web scrapers during knowledge indexing.
 */

class DocumentLoaderInterface {
  constructor(name = 'DocumentLoaderInterface') {
    this.name = name;
  }

  /**
   * Scans a target directory or data source for knowledge document files.
   * 
   * @param {string} sourcePath - Path or endpoint to scan.
   * @returns {Promise<Array<string>>} Array of discovered document file paths or IDs.
   */
  async discoverDocuments(_sourcePath) {
    throw new Error(`discoverDocuments() not implemented in ${this.name}`);
  }

  /**
   * Loads and parses raw file content and metadata frontmatter.
   * 
   * @param {string} filePath - Document file path or URI.
   * @returns {Promise<Object>} Document object containing { metadata, content }.
   */
  async loadDocument(_filePath) {
    throw new Error(`loadDocument() not implemented in ${this.name}`);
  }
}

module.exports = { DocumentLoaderInterface };
