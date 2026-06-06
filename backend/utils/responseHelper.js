/**
 * Helper to dispatch uniform successful API payloads.
 * @param {import('express').Response} res 
 * @param {string} message 
 * @param {Object} [data={}] 
 * @param {number} [statusCode=200] 
 */
const sendSuccess = (res, message, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...data // Spread data fields directly (e.g. environment, version) or wrap it depending on needs
  });
};

/**
 * Helper to dispatch uniform error payloads.
 * @param {import('express').Response} res 
 * @param {string} message 
 * @param {Array} [errors=[]] 
 * @param {number} [statusCode=500] 
 */
const sendError = (res, message, errors = [], statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors
  });
};

module.exports = {
  sendSuccess,
  sendError
};
