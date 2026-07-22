/**
 * @file document-validator.interface.js
 * @description Interface Contract for KMS Document Validation.
 * 
 * RESPONSIBILITY:
 * Enforces metadata schema validation, required fields verification, duplicate slug detection,
 * and content sanity checks before document indexing.
 */

class DocumentValidatorInterface {
  constructor(name = 'DocumentValidatorInterface') {
    this.name = name;
  }

  /**
   * Validates document object metadata and content structure.
   * 
   * @param {Object} document - Document object containing { metadata, content }.
   * @returns {Promise<Object>} Result object { isValid: boolean, errors: Array<string> }.
   */
  async validateDocument(_document) {
    throw new Error(`validateDocument() not implemented in ${this.name}`);
  }
}

module.exports = { DocumentValidatorInterface };
