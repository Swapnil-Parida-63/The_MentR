const { z } = require('zod');
const { AV_STATUSES } = require('../../constants/enums');
const { idParamSchema, listQuerySchema, objectId } = require('../../validations/common.validation');

const assessmentVisitBody = z.object({
  parentRequirement: objectId,
  assignedTeacher: objectId,
  visitDate: z.coerce.date(),
  status: z.enum(AV_STATUSES).default('Pending'),
  notes: z.string().max(2000).optional(),
  outcome: z.string().max(2000).optional()
});

const createAssessmentVisitSchema = z.object({ body: assessmentVisitBody });
const updateAssessmentVisitSchema = idParamSchema.extend({ body: assessmentVisitBody.partial() });

module.exports = {
  assessmentVisitIdSchema: idParamSchema,
  createAssessmentVisitSchema,
  listAssessmentVisitSchema: listQuerySchema,
  updateAssessmentVisitSchema
};
