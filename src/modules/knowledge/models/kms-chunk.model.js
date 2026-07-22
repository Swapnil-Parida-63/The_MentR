/**
 * @file kms-chunk.model.js
 * @description Data Schema for Vector Document Chunks in MongoDB Atlas Vector Search.
 * 
 * RESPONSIBILITY:
 * Represents indexed text chunks generated from KmsDocuments for MongoDB Atlas Vector Search.
 * Stores text content, heading hierarchy, vector embedding float arrays (1536 dimensions),
 * and metadata tags.
 */

const mongoose = require('mongoose');

const kmsChunkSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'KmsDocument',
      required: true,
      index: true
    },
    chunkIndex: {
      type: Number,
      required: true
    },
    heading: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      required: true
    },
    tokenCount: {
      type: Number,
      default: 0
    },
    contentHash: {
      type: String,
      index: true
    },
    // MongoDB Atlas Vector Search 1536-dim Float Array
    vector: {
      type: [Number],
      default: []
    },
    metadata: {
      title: String,
      slug: String,
      category: {
        type: String,
        index: true
      },
      tags: [String],
      heading: String,
      source: String
    }
  },
  {
    timestamps: true
  }
);

kmsChunkSchema.index({ 'metadata.category': 1 });

const KmsChunk = mongoose.models.KmsChunk || mongoose.model('KmsChunk', kmsChunkSchema);

module.exports = { KmsChunk, kmsChunkSchema };
