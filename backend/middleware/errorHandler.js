const config = require('../config/env');
const { sendError } = require('../utils/responseHelper');

/**
 * Enterprise global error catcher middleware.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const errors = err.errors || [];

  // Structure output
  const responseData = {
    success: false,
    message
  };

  if (errors.length > 0) {
    responseData.errors = errors;
  }

  // Attach stacks only in dev
  if (config.env === 'development') {
    responseData.stack = err.stack;
  }

  // Log deep errors on host terminal
  if (statusCode === 500) {
    console.error(`[Fatal Server Error] path: ${req.path} | error: ${err.message}`);
    console.error(err.stack);
  }

  return res.status(statusCode).json(responseData);
};

module.exports = errorHandler;
