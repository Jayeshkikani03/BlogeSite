const healthService = require('../services/healthService');
const { sendSuccess } = require('../utils/responseHelper');

/**
 * Get system health telemetry
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getHealthStatus = (req, res) => {
  const healthData = healthService.getHealthDetails();
  return sendSuccess(res, 'API Running', healthData, 200);
};

module.exports = {
  getHealthStatus
};
