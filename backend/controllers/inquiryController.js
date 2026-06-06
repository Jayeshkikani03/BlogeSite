const Inquiry = require('../models/Inquiry');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/responseHelper');

/**
 * Get all contact inquiries
 * GET /api/inquiries
 */
const getInquiries = asyncHandler(async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  
  return sendSuccess(res, 'Inquiries retrieved successfully', {
    count: inquiries.length,
    inquiries
  }, 200);
});

/**
 * Update inquiry status (read/unread)
 * PUT /api/inquiries/:id
 */
const updateInquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status || !['unread', 'read'].includes(status)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid status: unread or read'
    });
  }

  const inquiry = await Inquiry.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!inquiry) {
    return res.status(404).json({
      success: false,
      error: 'Inquiry not found'
    });
  }

  return sendSuccess(res, 'Inquiry status updated successfully', inquiry, 200);
});

/**
 * Delete inquiry
 * DELETE /api/inquiries/:id
 */
const deleteInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

  if (!inquiry) {
    return res.status(404).json({
      success: false,
      error: 'Inquiry not found'
    });
  }

  return sendSuccess(res, 'Inquiry deleted successfully', {}, 200);
});

module.exports = {
  getInquiries,
  updateInquiryStatus,
  deleteInquiry
};
