const { z } = require('zod');
const { ROLES } = require('../../constants/enums');

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(120),
    email: z.string().email(),
    phone: z.string().min(7).max(20),
    password: z.string().min(8).max(128),
    role: z.enum(ROLES).default('Parent')
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1)
  })
});

module.exports = { loginSchema, registerSchema };
