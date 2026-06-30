const { createCrudController } = require('../../controllers/crud.controller');
const { asyncHandler } = require('../../utils/async-handler');
const { organogramService } = require('./organogram.service');

const crud = createCrudController(organogramService);

const tree = asyncHandler(async (_req, res) => {
  const data = await organogramService.tree();
  res.status(200).json({ success: true, data });
});

module.exports = { ...crud, tree };
