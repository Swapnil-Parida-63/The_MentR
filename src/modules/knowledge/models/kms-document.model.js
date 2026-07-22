/**
 * @file kms-document.model.js
 * @description Mongoose Schema & Data Model for KMS Knowledge Documents.
 * 
 * RESPONSIBILITY:
 * Defines document metadata fields, status lifecycle (draft/published/archived), language versioning,
 * category taxonomy, and future embedding/vector database ID placeholders.
 * 
 * FUTURE PURPOSE:
 * Serves as the database persistence schema for knowledge items parsed from the `knowledge/` directory
 * and managed via administrative CMS workflows.
 * 
 * CONNECTIONS:
 * - Managed by `KmsService`.
 * - Validated by `DocumentValidatorInterface`.
 */

const mongoose = require('mongoose');

const kmsDocumentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    category: {
      type: String,
      required: true,
      enum: [
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
      ],
      index: true
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true
      }
    ],
    description: {
      type: String,
      trim: true,
      default: ''
    },
    author: {
      type: String,
      default: 'TheMentR Knowledge Team'
    },
    version: {
      type: String,
      default: '1.0.0'
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
      index: true
    },
    language: {
      type: String,
      default: 'en',
      index: true
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    source: {
      type: String,
      default: 'file_system'
    },
    visibility: {
      type: String,
      enum: ['public', 'internal', 'restricted'],
      default: 'public'
    },
    priority: {
      type: Number,
      default: 1
    },
    format: {
      type: String,
      enum: ['markdown', 'json', 'pdf', 'docx', 'html', 'cms'],
      default: 'markdown'
    },
    content: {
      type: String,
      required: true
    },
    // Future Vector Embedding Placeholders
    embeddingId: {
      type: String,
      default: null
    },
    vectorId: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

kmsDocumentSchema.index({ category: 1, status: 1, language: 1 });
kmsDocumentSchema.index({ tags: 1 });

const KmsDocument = mongoose.models.KmsDocument || mongoose.model('KmsDocument', kmsDocumentSchema);

module.exports = { KmsDocument, kmsDocumentSchema };
