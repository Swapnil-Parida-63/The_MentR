const { z } = require('zod');
const { idParamSchema, listQuerySchema } = require('../../validations/common.validation');

const teacherBody = z.object({
  firstName: z.string().min(2).max(120),
  lastName: z.string().min(2).max(120),
  email: z.string().email().or(z.string().max(0)).optional(),
  phone: z.string().min(7).max(20),
  dob: z.string().or(z.date()).optional(),
  currentAddress: z.string().max(1000).optional(),
  fatherName: z.string().max(120).optional(),
  motherName: z.string().max(120).optional(),
  boardsToTeach: z.array(z.string()).default([]),
  boardsAlreadyTaught: z.array(z.string()).default([]),
  classesToTeach: z.array(z.string()).default([]),
  classesAlreadyTaught: z.array(z.string()).default([]),
  subjectsToTeach: z.array(z.string()).default([]),
  subjectsPreviouslyTaught: z.array(z.string()).default([]),
  mediumOfInstruction: z.array(z.string()).default([]),
  mostComfortableMedium: z.string().optional(),
  preferredLocations: z.array(z.string()).default([]),
  verificationStatus: z.enum(['Pending', 'Verified', 'Rejected']).default('Pending')
});

const createTeacherSchema = z.object({ body: teacherBody });
const updateTeacherSchema = idParamSchema.extend({ body: teacherBody.partial() });

module.exports = { createTeacherSchema, listTeacherSchema: listQuerySchema, updateTeacherSchema, teacherIdSchema: idParamSchema };
