const { asyncHandler } = require('../utils/async-handler');

function createCrudController(service) {
  return {
    create: asyncHandler(async (req, res) => {
      const item = await service.create(req.body);
      res.status(201).json({ success: true, data: item });
    }),

    get: asyncHandler(async (req, res) => {
      const item = await service.getById(req.params.id);
      res.status(200).json({ success: true, data: item });
    }),

    list: asyncHandler(async (req, res) => {
      const result = await service.list(req.query);
      res.status(200).json({ success: true, data: result.items, pagination: result.pagination });
    }),

    update: asyncHandler(async (req, res) => {
      const item = await service.update(req.params.id, req.body);
      res.status(200).json({ success: true, data: item });
    }),

    remove: asyncHandler(async (req, res) => {
      await service.remove(req.params.id);
      res.status(204).send();
    })
  };
}

module.exports = { createCrudController };
