const { z } = require('zod');
const { CONTENT_STATUSES } = require('../../constants/enums');
const { idParamSchema, listQuerySchema, objectId } = require('../../validations/common.validation');

const olympiadBody = z.object({
  title: z.string().min(2).max(160),
  description: z.string().min(1).max(5000),
  month: z.string().min(1).max(40),
  examDate: z.coerce.date(),
  registrationDeadline: z.coerce.date(),
  status: z.enum(CONTENT_STATUSES).default('Draft')
});

const studyMaterialBody = z.object({
  title: z.string().min(2).max(160),
  description: z.string().max(2000).optional(),
  olympiad: objectId.optional(),
  fileUrl: z.string().url(),
  status: z.enum(CONTENT_STATUSES).default('Draft')
});

const participantBody = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  olympiad: objectId,
  class: z.string().min(1).max(40),
  school: z.string().max(160).optional(),
  status: z.enum(['Registered', 'Confirmed', 'Cancelled']).default('Registered')
});

const resultBody = z.object({
  olympiad: objectId,
  participant: objectId,
  score: z.coerce.number().min(0),
  rank: z.coerce.number().int().positive().optional(),
  status: z.enum(CONTENT_STATUSES).default('Draft')
});

const makeSchemas = (body) => ({
  create: z.object({ body }),
  update: idParamSchema.extend({ body: body.partial() }),
  get: idParamSchema,
  list: listQuerySchema
});

module.exports = {
  olympiadSchemas: makeSchemas(olympiadBody),
  participantSchemas: makeSchemas(participantBody),
  resultSchemas: makeSchemas(resultBody),
  studyMaterialSchemas: makeSchemas(studyMaterialBody)
};
