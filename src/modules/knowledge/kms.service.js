/**
 * @file kms.service.js
 * @description Central Service Orchestrator for Knowledge Management System (KMS).
 * 
 * RESPONSIBILITY:
 * High-level orchestration of knowledge documents, discovery scanning, taxonomy categories,
 * format parser registry, and document model management.
 * 
 * FUTURE PURPOSE:
 * Serves as the single API service interface for RAG knowledge ingestion, admin document uploads,
 * and search retrieval.
 * 
 * CONNECTIONS:
 * - Uses `KmsDocument` model.
 * - Interacts with `formatParserRegistry`.
 */

const path = require('path');
const fs = require('fs');
const { KmsDocument } = require('./models');
const { formatParserRegistry } = require('./formatters/format-parser.registry');

class KmsService {
  constructor(registry = formatParserRegistry) {
    this.parserRegistry = registry;
    this.knowledgeBaseDir = path.join(process.cwd(), 'knowledge');
    this.categories = [
      'company',
      'services',
      'parents',
      'teachers',
      'students',
      'pricing',
      'policies',
      'methodology',
      'blogs',
      'faqs',
      'career',
      'workflows'
    ];
  }

  /**
   * Scans and returns all registered category directory names.
   * 
   * @returns {Array<string>} List of categories.
   */
  getCategories() {
    return [...this.categories];
  }

  /**
   * Retrieves summary statistics of knowledge categories and documents.
   * 
   * @returns {Promise<Object>} Summary object { totalCategories, categoryCounts }.
   */
  async getKmsSummary() {
    const counts = {};

    for (const cat of this.categories) {
      const dirPath = path.join(this.knowledgeBaseDir, cat);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath).filter((f) => !f.startsWith('.'));
        counts[cat] = files.length;
      } else {
        counts[cat] = 0;
      }
    }

    return {
      knowledgeBaseDirectory: this.knowledgeBaseDir,
      totalCategories: this.categories.length,
      categoryFileCounts: counts
    };
  }

  /**
   * Registers/upserts a document in the KMS system database.
   * 
   * @param {Object} docData - Document model metadata and content.
   * @returns {Promise<Object>} Saved KmsDocument instance.
   */
  async registerDocument(docData) {
    const existing = await KmsDocument.findOne({ slug: docData.slug });
    if (existing) {
      Object.assign(existing, docData, { lastUpdated: new Date() });
      return await existing.save();
    }
    return await KmsDocument.create(docData);
  }
}

const kmsService = new KmsService();

module.exports = { KmsService, kmsService };
