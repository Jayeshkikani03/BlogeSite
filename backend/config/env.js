const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const envType = process.env.NODE_ENV || 'development';
const envFile = `.env.${envType}`;
let envPath = path.resolve(__dirname, '..', envFile);

// Fall back to standard .env if environment-specific file does not exist
if (!fs.existsSync(envPath)) {
  envPath = path.resolve(__dirname, '..', '.env');
}

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
  },
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/BlogeSite',
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-key-for-development',
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    adminEmail: process.env.ADMIN_EMAIL || ''
  }
};

// Validate variables
if (isNaN(config.port)) {
  throw new Error(`PORT configuration must be a valid number. Got: ${process.env.PORT}`);
}

module.exports = config;
