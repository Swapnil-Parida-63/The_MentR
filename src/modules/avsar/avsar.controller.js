const { asyncHandler } = require('../../utils/async-handler');
const { AvsarService } = require('./avsar.service');

const avsarService = new AvsarService();

const dashboard = asyncHandler(async (_req, res) => {
  const data = await avsarService.dashboard();
  res.status(200).json({ success: true, data });
});

module.exports = { dashboard };
