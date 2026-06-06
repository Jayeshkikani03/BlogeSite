const express = require('express');
const router = express.Router();

const healthRoutes = require('./healthRoutes');
const contactRoutes = require('./contactRoutes');
const authRoutes = require('./authRoutes');
const inquiryRoutes = require('./inquiryRoutes');

// Map child routes
router.use('/health', healthRoutes);
router.use('/contact', contactRoutes);
router.use('/auth', authRoutes);
router.use('/inquiries', inquiryRoutes);

module.exports = router;
