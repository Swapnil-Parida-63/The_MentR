const { asyncHandler } = require('../../utils/async-handler');
const { ChatbotService } = require('./chatbot.service');

const service = new ChatbotService();

const chat = asyncHandler(async (_req, res) => {
  res.status(200).json({ success: true, message: service.chat() });
});

module.exports = { chat };
