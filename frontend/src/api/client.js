import axios from 'axios';
import env from '../config/env';

// Create central Axios instance
const client = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000 // 15s timeout limit
});

// Request Interceptor
client.interceptors.request.use(
  (config) => {
    // Audit logs for outgoing requests
    if (import.meta.env.MODE === 'development') {
      console.log(`[API Request] Method: ${config.method.toUpperCase()} | URL: ${config.url}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Global Error Handling)
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Standardize exception formats
    const apiError = {
      message: 'Network error connecting to API gateway.',
      status: error.response?.status || 500,
      errors: []
    };

    if (error.response) {
      if (error.response.data) {
        apiError.message = error.response.data.message || error.message;
        apiError.errors = error.response.data.errors || [];
      } else {
        apiError.message = `HTTP Error: ${error.response.statusText}`;
      }
    } else if (error.request) {
      apiError.message = 'No response from API gateway. Please check if the server is online.';
    }

    if (import.meta.env.MODE === 'development') {
      console.error('[API Error]', apiError);
    }

    return Promise.reject(apiError);
  }
);

export default client;
