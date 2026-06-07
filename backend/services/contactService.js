const Inquiry = require('../models/Inquiry');
const nodemailer = require('nodemailer');
const config = require('../config/env');

/**
 * Contact Form Logic Service.
 */
const saveContactInquiry = async (contactData) => {
  const { name, email, subject, message } = contactData;

  // Save inquiry in MongoDB
  const inquiry = await Inquiry.create({ name, email, subject, message });

  console.log('--- Enterprise Contact Inquiry Saved to DB ---');
  console.log(`ID     : ${inquiry._id}`);
  console.log(`Name   : ${name} | Email: ${email}`);
  console.log(`Subject: ${subject}`);
  console.log('---------------------------------');

  // Send email notifications if SMTP is configured
  if (config.smtp.host && config.smtp.user) {
    const transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465,
      auth: { user: config.smtp.user, pass: config.smtp.pass }
    });

    // Confirmation to user
    await transporter.sendMail({
      from: `"TechFlow" <${config.smtp.user}>`,
      to: email,
      subject: 'We received your inquiry — TechFlow',
      html: `<p>Hi <strong>${name}</strong>,</p><p>Thanks for reaching out! We received your message about <em>${subject}</em> and will get back to you within 24 hours.</p><p>— TechFlow Team</p>`
    }).catch((err) => console.error('[Email] Confirmation send failed:', err.message));

    // Notification to admin
    if (config.smtp.adminEmail) {
      await transporter.sendMail({
        from: `"TechFlow" <${config.smtp.user}>`,
        to: config.smtp.adminEmail,
        subject: `[New Inquiry] ${subject}`,
        html: `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong><br/>${message}</p>`
      }).catch((err) => console.error('[Email] Admin notification failed:', err.message));
    }
  }

  return { success: true, data: inquiry };
};

module.exports = { saveContactInquiry };