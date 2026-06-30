const { z } = require('zod');
const { idParamSchema, listQuerySchema } = require('../../validations/common.validation');

const blogBody = z.object({
  title: z.string().min(2).max(180),
  slug: z.string().min(2).max(220).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  thumbnail: z.string().url().optional(),
  content: z.string().min(1),
  author: z.string().min(2).max(120),
  published: z.boolean().default(false)
});

module.exports = {
  createBlogSchema: z.object({ body: blogBody }),
  updateBlogSchema: idParamSchema.extend({ body: blogBody.partial() }),
  blogIdSchema: idParamSchema,
  listBlogSchema: listQuerySchema
};
