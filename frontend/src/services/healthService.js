import client from '../api/client';

/**
 * Service to manage system status checks.
 */
const healthService = {
  /**
   * Fetch api status telemetry
   */
  getHealthStatus: async () => {
    const response = await client.get('/health');
    return response.data;
  }
};

export default healthService;
