const { z } = require('zod');

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');

const idParamSchema = z.object({
  params: z.object({ id: objectId })
});

const listQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    sort: z.string().optional(),
    search: z.string().optional()
  }).catchall(z.string().optional())
});

module.exports = { idParamSchema, listQuerySchema, objectId };
