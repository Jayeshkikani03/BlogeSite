const config = require('../config/env');

/**
 * Health telemetry business logic service.
 */
const getHealthDetails = () => {
  return {
    service: 'TechFlow API',
    environment: config.env,
    version: '1.0.0',
    uptime: Math.floor(process.uptime()), // Uptime in seconds
    timestamp: new Date().toISOString()
  };
};

module.exports = {
  getHealthDetails
};
