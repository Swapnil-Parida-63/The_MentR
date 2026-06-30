const { asyncHandler } = require('../../utils/async-handler');
const { TheMentROnlineService } = require('./thementr-online.service');

const service = new TheMentROnlineService();

const searchTeachers = asyncHandler(async (req, res) => {
  const result = await service.search(req.query);
  res.status(200).json({ success: true, data: result.items, pagination: result.pagination });
});

module.exports = { searchTeachers };
