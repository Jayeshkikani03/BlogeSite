const { validationResult } = require('express-validator');
const { sendError } = require('../utils/responseHelper');

/**
 * Intercepts express-validator errors and rejects request if fields are invalid.
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().forEach(err => {
      extractedErrors.push({ [err.path]: err.msg });
    });

    return sendError(res, 'Validation failed', extractedErrors, 400);
  }
  next();
};

module.exports = validateRequest;
