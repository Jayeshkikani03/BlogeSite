const express = require('express');
const router = express.Router();

const healthRoutes = require('./healthRoutes');
const contactRoutes = require('./contactRoutes');

// Map child routes
router.use('/health', healthRoutes);
router.use('/contact', contactRoutes);

module.exports = router;
