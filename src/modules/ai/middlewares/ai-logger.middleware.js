/**
 * @file ai-logger.middleware.js
 * @description AI Request/Response Logging Middleware Placeholder.
 * 
 * RESPONSIBILITY:
 * Logs incoming AI requests, prompt lengths, execution latency, and response status.
 * 
 * FUTURE PURPOSE:
 * Provides structured audit logs and debug traces for conversational AI endpoints.
 * 
 * CONNECTIONS:
 * - Applied to `ai.routes.js`.
 */

function aiLogger(req, res, next) {
  const startTime = Date.now();

  res.on('finish', () => {
    const durationMs = Date.now() - startTime;
    // TODO: Connect to centralized logger (e.g. Winston / Pino / Datadog)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[AI-API] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} (${durationMs}ms)`);
    }
  });

  next();
}

module.exports = { aiLogger };
