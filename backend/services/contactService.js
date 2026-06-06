/**
 * Contact Form Logic Service.
 */
const saveContactInquiry = async (contactData) => {
  const { name, email, subject, message } = contactData;

  // Real database calls or email dispatches happen here in production
  console.log('--- Enterprise Contact Inquiry ---');
  console.log(`Time   : ${new Date().toISOString()}`);
  console.log(`Name   : ${name}`);
  console.log(`Email  : ${email}`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${message}`);
  console.log('---------------------------------');

  return { success: true };
};

module.exports = {
  saveContactInquiry
};
