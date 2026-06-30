const { z } = require('zod');
const { REQUIREMENT_STATUSES } = require('../../constants/enums');
const { idParamSchema, listQuerySchema } = require('../../validations/common.validation');

const parentRequirementBody = z.object({
  parentName: z.string().min(2).max(120),
  phone: z.string().min(7).max(20),
  email: z.string().email().or(z.string().max(0)).optional(), // allow empty string or optional
  location: z.string().min(2).max(120).optional(),
  board: z.string().min(1).max(80),
  class: z.string().min(1).max(40),
  subjects: z.array(z.string().min(1)).min(1),
  learningMode: z.enum(['Online', 'Offline', 'Hybrid']).default('Offline'),
  preferredTiming: z.string().min(1).max(120).optional(),
  additionalNotes: z.string().max(2000).optional(),
  status: z.enum(REQUIREMENT_STATUSES).default('New')
});

const createParentRequirementSchema = z.object({ body: parentRequirementBody });
const updateParentRequirementSchema = idParamSchema.extend({ body: parentRequirementBody.partial() });

module.exports = {
  createParentRequirementSchema,
  listParentRequirementSchema: listQuerySchema,
  parentRequirementIdSchema: idParamSchema,
  updateParentRequirementSchema
};
