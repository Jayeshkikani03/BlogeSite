const Inquiry = require('../models/Inquiry');
const nodemailer = require('nodemailer');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/responseHelper');
const config = require('../config/env');

/**
 * GET /api/inquiries
 */
const getInquiries = asyncHandler(async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  return sendSuccess(res, 'Inquiries retrieved successfully', { count: inquiries.length, inquiries }, 200);
});

/**
 * PUT /api/inquiries/:id
 */
const updateInquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!status || !['unread', 'read'].includes(status)) {
    return res.status(400).json({ success: false, error: 'Please provide a valid status: unread or read' });
  }
  const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
  if (!inquiry) return res.status(404).json({ success: false, error: 'Inquiry not found' });
  return sendSuccess(res, 'Inquiry status updated successfully', inquiry, 200);
});

/**
 * DELETE /api/inquiries/:id
 */
const deleteInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
  if (!inquiry) return res.status(404).json({ success: false, error: 'Inquiry not found' });
  return sendSuccess(res, 'Inquiry deleted successfully', {}, 200);
});

/**
 * POST /api/inquiries/:id/reply
 */
const replyInquiry = asyncHandler(async (req, res) => {
  const { message } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ success: false, error: 'Reply message is required' });
  }

  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry) return res.status(404).json({ success: false, error: 'Inquiry not found' });

  if (!config.smtp.host || !config.smtp.user) {
    return res.status(503).json({ success: false, error: 'Email service not configured' });
  }

  const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465,
    auth: { user: config.smtp.user, pass: config.smtp.pass }
  });

  await transporter.sendMail({
    from: `"TechFlow Support" <${config.smtp.user}>`,
    to: inquiry.email,
    subject: `Re: ${inquiry.subject}`,
    html: `<p>Hi <strong>${inquiry.name}</strong>,</p><p>${message}</p><p>— TechFlow Team</p>`
  });

  // Mark as read after reply
  await Inquiry.findByIdAndUpdate(req.params.id, { status: 'read' });

  return sendSuccess(res, 'Reply sent successfully', {}, 200);
});

module.exports = { getInquiries, updateInquiryStatus, deleteInquiry, replyInquiry };
