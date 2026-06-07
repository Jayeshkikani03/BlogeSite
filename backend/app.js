const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config/env');

const app = express();

// Security headers
app.use(helmet());

// Configure CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (config.cors.allowedOrigins.indexOf(origin) !== -1 || config.env === 'development') {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Global rate limiter — 100 requests per 15 min per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' }
});
app.use(globalLimiter);

// Strict rate limiter for contact form — 5 requests per 10 min per IP
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many contact submissions. Please wait before trying again.' }
});
app.use('/api/contact', contactLimiter);

// Parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing mapping
app.use('/api', apiRoutes);

// Unmatched route fallback
app.use((req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Central error middleware
app.use(errorHandler);

module.exports = app;
