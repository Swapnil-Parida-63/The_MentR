const { z } = require('zod');
const { idParamSchema, listQuerySchema, objectId } = require('../../validations/common.validation');

function schemasFor(body) {
  return {
    create: z.object({ body }),
    update: idParamSchema.extend({ body: body.partial() }),
    get: idParamSchema,
    list: listQuerySchema
  };
}

const gallerySchemas = schemasFor(z.object({
  title: z.string().min(2).max(160),
  imageUrl: z.string().url(),
  category: z.string().min(1).max(80)
}));

const testimonialSchemas = schemasFor(z.object({
  name: z.string().min(2).max(120),
  role: z.string().min(1).max(80),
  message: z.string().min(1).max(2000),
  imageUrl: z.string().url().optional()
}));

const contactFormSchemas = schemasFor(z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(7).max(20),
  email: z.string().email(),
  message: z.string().min(1).max(2000),
  status: z.enum(['New', 'Contacted', 'Closed']).default('New')
}));

const organogramSchemas = schemasFor(z.object({
  departmentName: z.string().min(2).max(160),
  parentDepartment: objectId.nullable().optional(),
  description: z.string().max(2000).optional()
}));

module.exports = { contactFormSchemas, gallerySchemas, organogramSchemas, testimonialSchemas };
