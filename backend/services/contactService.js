const Inquiry = require('../models/Inquiry');

/**
 * Contact Form Logic Service.
 */
const saveContactInquiry = async (contactData) => {
  const { name, email, subject, message } = contactData;

  // Save inquiry in MongoDB
  const inquiry = await Inquiry.create({
    name,
    email,
    subject,
    message
  });

  console.log('--- Enterprise Contact Inquiry Saved to DB ---');
  console.log(`ID     : ${inquiry._id}`);
  console.log(`Time   : ${inquiry.createdAt}`);
  console.log(`Name   : ${name}`);
  console.log(`Email  : ${email}`);
  console.log(`Subject: ${subject}`);
  console.log('---------------------------------');

  return { success: true, data: inquiry };
};

module.exports = {
  saveContactInquiry
};
