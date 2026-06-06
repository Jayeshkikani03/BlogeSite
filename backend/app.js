const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config/env');

const app = express();

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
