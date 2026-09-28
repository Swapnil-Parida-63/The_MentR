const { z } = require('zod');
const { idParamSchema, listQuerySchema } = require('../../validations/common.validation');

const teacherBaseBody = z.object({
  firstName: z.string().min(1).max(120),
  lastName: z.string().min(1).max(120),
  email: z.string().email().or(z.literal('')).optional(),
  phone: z.string().min(7).max(20),
  dob: z.string().or(z.date()).optional().or(z.literal('')),
  currentAddress: z.string().max(1000).optional().or(z.literal('')),
  address: z.string().max(1000).optional().or(z.literal('')),
  fatherName: z.string().max(120).optional().or(z.literal('')),
  motherName: z.string().max(120).optional().or(z.literal('')),
  boardsToTeach: z.array(z.string()).or(z.string().transform(s => s ? [s] : [])).default([]),
  boardsAlreadyTaught: z.array(z.string()).or(z.string().transform(s => s ? [s] : [])).default([]),
  classesToTeach: z.array(z.string()).or(z.string().transform(s => s ? [s] : [])).default([]),
  classesAlreadyTaught: z.array(z.string()).or(z.string().transform(s => s ? [s] : [])).default([]),
  subjectsToTeach: z.array(z.string()).or(z.string().transform(s => s ? [s] : [])).default([]),
  subjectToTeach: z.array(z.string()).or(z.string().transform(s => s ? [s] : [])).optional(),
  subjectsPreviouslyTaught: z.array(z.string()).or(z.string().transform(s => s ? [s] : [])).default([]),
  subjectPreviouslyTaught: z.array(z.string()).or(z.string().transform(s => s ? [s] : [])).optional(),
  mediumOfInstruction: z.array(z.string()).or(z.string().transform(s => s ? [s] : [])).default([]),
  mostComfortableMedium: z.string().max(120).optional().or(z.literal('')),
  preferredLocations: z.array(z.string()).or(z.string().transform(s => s ? [s] : [])).default([]),
  verificationStatus: z.enum(['Pending', 'Verified', 'Rejected']).default('Pending')
});

function normalizeTeacherData(data) {
  if (!data) return data;
  if (!data.currentAddress && data.address) {
    data.currentAddress = data.address;
  }
  if ((!data.subjectsToTeach || data.subjectsToTeach.length === 0) && data.subjectToTeach) {
    data.subjectsToTeach = Array.isArray(data.subjectToTeach) ? data.subjectToTeach : [data.subjectToTeach];
  }
  if ((!data.subjectsPreviouslyTaught || data.subjectsPreviouslyTaught.length === 0) && data.subjectPreviouslyTaught) {
    data.subjectsPreviouslyTaught = Array.isArray(data.subjectPreviouslyTaught) ? data.subjectPreviouslyTaught : [data.subjectPreviouslyTaught];
  }
  return data;
}

const teacherBody = teacherBaseBody.transform(normalizeTeacherData);

const createTeacherSchema = z.object({ body: teacherBody });
const updateTeacherSchema = idParamSchema.extend({ body: teacherBaseBody.partial().transform(normalizeTeacherData) });

module.exports = { createTeacherSchema, listTeacherSchema: listQuerySchema, updateTeacherSchema, teacherIdSchema: idParamSchema };
