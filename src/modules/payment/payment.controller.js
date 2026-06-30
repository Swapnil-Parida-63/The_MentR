const { asyncHandler } = require('../../utils/async-handler');
const { PaymentService } = require('./payment.service');

const service = new PaymentService();

const comingSoon = asyncHandler(async (_req, res) => {
  res.status(200).json({ success: true, message: service.comingSoon() });
});

module.exports = { comingSoon };
