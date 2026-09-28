const { z } = require('zod');
const { REQUIREMENT_STATUSES } = require('../../constants/enums');
const { idParamSchema, listQuerySchema } = require('../../validations/common.validation');

const parentRequirementBody = z.object({
  parentName: z.string().min(1).max(120),
  phone: z.string().min(7).max(20),
  email: z.string().email().or(z.literal('')).optional(),
  location: z.string().max(255).optional().or(z.literal('')),
  studentName: z.string().max(255).optional().or(z.literal('')),
  specificSubject: z.string().max(255).optional().or(z.literal('')),
  board: z.string().min(1).max(255),
  class: z.string().min(1).max(255),
  subjects: z.array(z.string()).or(z.string().transform(s => s ? [s] : [])).optional().default([]),
  learningMode: z.enum(['Online', 'Offline', 'Hybrid']).default('Offline'),
  preferredTiming: z.string().max(255).optional().or(z.literal('')),
  additionalNotes: z.string().max(2000).optional().or(z.literal('')),
  agreedToTerms: z.boolean().optional(),
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
