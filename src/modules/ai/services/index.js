/**
 * @file index.js
 * @description Unified Export Index for Mentee AI Services.
 */

const chatService = require('./chat.service');
const promptService = require('./prompt.service');
const retrievalService = require('./retrieval.service');
const embeddingService = require('./embedding.service');
const bookingService = require('./booking.service');
const analyticsService = require('./analytics.service');
const conversationService = require('./conversation.service');

module.exports = {
  chatService,
  promptService,
  retrievalService,
  embeddingService,
  bookingService,
  analyticsService,
  conversationService
};
