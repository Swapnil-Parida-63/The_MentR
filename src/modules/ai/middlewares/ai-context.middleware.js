/**
 * @file ai-context.middleware.js
 * @description AI Request Context Extraction Middleware Placeholder.
 * 
 * RESPONSIBILITY:
 * Extracts client headers (client channel, app version, session ID, user context) and attaches them to `req.aiContext`.
 * 
 * FUTURE PURPOSE:
 * Enables uniform multi-client handling (Web, iOS, Android, Desktop) across all AI endpoints.
 * 
 * CONNECTIONS:
 * - Applied to `ai.routes.js`.
 */

function extractAiContext(req, _res, next) {
  const clientChannel = req.headers['x-client-channel'] || req.body?.channel || 'website';
  const appVersion = req.headers['x-app-version'] || '1.0.0';
  const sessionId = req.headers['x-session-id'] || req.body?.sessionId || null;

  req.aiContext = {
    clientChannel,
    appVersion,
    sessionId,
    timestamp: new Date().toISOString()
  };

  next();
}

module.exports = { extractAiContext };
