const { z } = require('zod');
const { idParamSchema, listQuerySchema } = require('../../validations/common.validation');

const pricingLeadBody = z.object({
  fullName: z.string().min(2).max(120),
  phone: z.string().min(10).max(15),
  email: z.string().email(),
  isParent: z.boolean().default(false),
  boards: z.array(z.string().min(1)).optional().default([]),
  classes: z.array(z.string().min(1)).optional().default([]),
  subjects: z.array(z.string().min(1)).optional().default([]),
  categories: z.array(z.string().min(1)).optional().default([])
});

const createPricingLeadSchema = z.object({ body: pricingLeadBody });
const updatePricingLeadSchema = idParamSchema.extend({ body: pricingLeadBody.partial() });

module.exports = {
  createPricingLeadSchema,
  listPricingLeadSchema: listQuerySchema,
  pricingLeadIdSchema: idParamSchema,
  updatePricingLeadSchema
};
