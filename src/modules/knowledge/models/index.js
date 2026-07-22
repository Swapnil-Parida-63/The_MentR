/**
 * @file index.js
 * @description Unified Export Index for KMS Models.
 */

const { KmsDocument, kmsDocumentSchema } = require('./kms-document.model');
const { KmsChunk, kmsChunkSchema } = require('./kms-chunk.model');

module.exports = {
  KmsDocument,
  kmsDocumentSchema,
  KmsChunk,
  kmsChunkSchema
};
