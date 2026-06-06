import client from '../api/client';

/**
 * Service to manage contact form submissions.
 */
const contactService = {
  /**
   * Submit contact form payload
   * @param {Object} data - Contact form values
   * @param {string} data.name
   * @param {string} data.email
   * @param {string} data.subject
   * @param {string} data.message
   */
  submitContact: async (data) => {
    const response = await client.post('/contact', data);
    return response.data;
  }
};

export default contactService;
