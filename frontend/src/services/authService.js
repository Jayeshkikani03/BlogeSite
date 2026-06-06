import client from '../api/client';

const authService = {
  login: async (email, password) => {
    const response = await client.post('/auth/login', { email, password });
    if (response.data?.success && response.data?.data?.token) {
      localStorage.setItem('admin_token', response.data.data.token);
      localStorage.setItem('admin_user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await client.get('/auth/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('admin_token');
  }
};

export default authService;
