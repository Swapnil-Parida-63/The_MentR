const dotenv = require('dotenv');
const { z } = require('zod');

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(24, 'JWT_SECRET must be at least 24 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  CORS_ORIGIN: z.string().default('*'),
  API_BASE_URL: z.string().url().default('http://localhost:5000'),
  TEACHER_FORM_WEBHOOK_URL: z.string().url().optional().or(z.literal('')).default('https://script.google.com/macros/s/AKfycbwCedySKcFbpDWouWO_z3CQPDc2H6bi5aZ_HUC8hp-IoDJN3gYlZUycr6NWXq110az3OQ/exec'),
  PARENT_FORM_WEBHOOK_URL: z.string().url().optional().or(z.literal('')).default('https://script.google.com/macros/s/AKfycbwYnCMaJx7Cmq3lY0G7RulmrMpH2j-aXL1GGO5iq5sCS2JN7Dw-Js4z1rPgZbuU3Kgi/exec'),
  PRICING_FORM_WEBHOOK_URL: z.string().url().optional().or(z.literal('')).default('https://script.google.com/macros/s/AKfycbzieZGJ6EQCIAW81fS4v98VD8kYNoTcA8gub6q2ucBKnrcmH-rjfcgse4vnX9aeg_xZ/exec'),
  AI_PROVIDER: z.string().default('openai'),
  OPENAI_API_KEY: z.string().optional().default(''),
  OPENAI_MODEL: z.string().default('llama-3.3-70b-versatile'),
  OPENAI_BASE_URL: z.string().url().optional().default('https://api.groq.com/openai/v1'),
  OPENAI_TIMEOUT: z.coerce.number().int().positive().default(30000),
  OPENAI_MAX_TOKENS: z.coerce.number().int().positive().default(1024),
  OPENAI_TEMPERATURE: z.coerce.number().min(0).max(2).default(0.7),
  EMBEDDING_MODEL: z.string().default('text-embedding-3-small'),
  VECTOR_INDEX: z.string().default('mentee-knowledge-base'),
  PROMPT_VERSION: z.string().default('v1.0'),
  MAX_CONTEXT_DOCUMENTS: z.coerce.number().int().positive().default(5),
  RAG_SIMILARITY_THRESHOLD: z.coerce.number().min(0).max(1).default(0.65),
  SESSION_TIMEOUT_MINUTES: z.coerce.number().int().positive().default(60),
  CONVERSATION_MEMORY_WINDOW: z.coerce.number().int().positive().default(20),
  MAX_STORED_MESSAGES_PER_SESSION: z.coerce.number().int().positive().default(100)
});


const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

module.exports = { env: parsed.data };
