const dotenv = require('dotenv');
const path = require('path');

const envType = process.env.NODE_ENV || 'development';
const envFile = `.env.${envType}`;
const envPath = path.resolve(__dirname, '..', envFile);

// Load environment-specific file
dotenv.config({ path: envPath });

// Centralized configuration export
const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  env: envType,
  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:5173', 'http://localhost:3000']
  }
};

// Validate variables
if (isNaN(config.port)) {
  throw new Error(`PORT configuration must be a valid number. Got: ${process.env.PORT}`);
}

module.exports = config;
