/**
 * @file index.js
 * @description Unified Export Index for Mentee AI Data Models.
 */

const { Conversation } = require('./conversation.model');
const { Message } = require('./message.model');
const { KnowledgeDocument } = require('./knowledge-document.model');
const { BookingRequest } = require('./booking-request.model');
const { AnalyticsEvent } = require('./analytics-event.model');
const { Feedback } = require('./feedback.model');
const { Escalation } = require('./escalation.model');

module.exports = {
  Conversation,
  Message,
  KnowledgeDocument,
  BookingRequest,
  AnalyticsEvent,
  Feedback,
  Escalation
};
