import client from '../api/client';

const inquiryService = {
  getInquiries: async () => {
    const response = await client.get('/inquiries');
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await client.put(`/inquiries/${id}`, { status });
    return response.data;
  },

  deleteInquiry: async (id) => {
    const response = await client.delete(`/inquiries/${id}`);
    return response.data;
  }
};

export default inquiryService;
