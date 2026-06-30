const { z } = require('zod');

const teacherSearchSchema = z.object({
  query: z.object({
    board: z.string().optional(),
    class: z.string().optional(),
    subject: z.string().optional(),
    location: z.string().optional(),
    teachingMode: z.enum(['Online', 'Offline']).optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
    sort: z.string().optional()
  })
});

module.exports = { teacherSearchSchema };
