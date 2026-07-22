/**
 * @file index.js
 * @description Unified Export Index for Mentee Knowledge Management System (KMS) Subsystem.
 */

const models = require('./models');
const interfaces = require('./interfaces');
const { FormatParserRegistry, formatParserRegistry } = require('./formatters/format-parser.registry');
const { KmsService, kmsService } = require('./kms.service');

module.exports = {
  ...models,
  ...interfaces,
  FormatParserRegistry,
  formatParserRegistry,
  KmsService,
  kmsService
};
