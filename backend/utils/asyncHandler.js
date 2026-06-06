/**
 * Wraps async Express router callbacks to trap promise rejections and route them to the errorHandler.
 * @param {Function} fn - Async middleware function
 * @returns {Function}
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
