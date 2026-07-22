/**
 * @file knowledge-document.model.js
 * @description Mongoose Database Schema for Knowledge Base Documents & Vector Metadata.
 * 
 * RESPONSIBILITY:
 * Tracks ingested knowledge documents, categories, document content hashes, and chunk index mapping.
 * 
 * FUTURE PURPOSE:
 * Used by RAG indexing scripts and retrieval services to manage document versioning,
 * freshness, vector database ID mapping, and categories (company, parents, teachers, pricing, policies, methodology, blogs, faqs).
 * 
 * CONNECTIONS:
 * - Managed by `scripts/indexKnowledge.js`.
 * - Queried by `retrieval.service.js`.
 */

const mongoose = require('mongoose');

const knowledgeDocumentSchema = new mongoose.Schema(
  {
    documentId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['company', 'parents', 'teachers', 'pricing', 'policies', 'methodology', 'blogs', 'faqs'],
      required: true,
      index: true
    },
    filePath: {
      type: String,
      required: true
    },
    contentHash: {
      type: String,
      required: true
    },
    chunkCount: {
      type: Number,
      default: 0
    },
    vectorIds: [
      {
        type: String
      }
    ],
    status: {
      type: String,
      enum: ['draft', 'indexed', 'outdated', 'failed'],
      default: 'draft',
      index: true
    },
    lastIndexedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

knowledgeDocumentSchema.index({ category: 1, status: 1 });

const KnowledgeDocument = mongoose.model('AIKnowledgeDocument', knowledgeDocumentSchema);

module.exports = { KnowledgeDocument, knowledgeDocumentSchema };
