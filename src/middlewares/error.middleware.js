const { ZodError } = require('zod');

function errorHandler(error, _req, res, _next) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.errors
    });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Invalid resource id' });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Duplicate value',
      fields: Object.keys(error.keyPattern || {})
    });
  }

  const statusCode = error.statusCode || 500;
  const payload = {
    success: false,
    message: statusCode === 500 ? 'Internal server error' : error.message
  };

  if (error.details) payload.details = error.details;
  if (process.env.NODE_ENV !== 'production') payload.stack = error.stack;

  return res.status(statusCode).json(payload);
}

module.exports = { errorHandler };
