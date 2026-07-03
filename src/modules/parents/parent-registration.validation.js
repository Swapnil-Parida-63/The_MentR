const { z } = require('zod');
const { REQUIREMENT_STATUSES } = require('../../constants/enums');
const { idParamSchema, listQuerySchema } = require('../../validations/common.validation');

const parentRegistrationBody = z.object({
  parentName: z.string().min(2).max(120),
  phone: z.string().min(7).max(20),
  location: z.string().min(2).max(120),
  studentName: z.string().min(2).max(120),
  schoolName: z.string().min(2).max(120),
  board: z.enum(['CBSE', 'ICSE', 'IGCSE', 'State Board', 'State board']),
  class: z.string().min(1).max(40),
  status: z.enum(REQUIREMENT_STATUSES).default('New')
});

const createParentRegistrationSchema = z.object({ body: parentRegistrationBody });
const updateParentRegistrationSchema = idParamSchema.extend({ body: parentRegistrationBody.partial() });

module.exports = {
  createParentRegistrationSchema,
  listParentRegistrationSchema: listQuerySchema,
  parentRegistrationIdSchema: idParamSchema,
  updateParentRegistrationSchema
};
