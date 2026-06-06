const contactService = require('../services/contactService');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/responseHelper');

/**
 * Handle contact form submissions
 * POST /api/contact
 */
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  await contactService.saveContactInquiry({ name, email, subject, message });

  return sendSuccess(res, 'Contact submitted successfully', {}, 200);
});

module.exports = {
  submitContact
};
