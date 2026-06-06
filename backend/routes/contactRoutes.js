const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { contactValidationRules } = require('../validators/contactValidator');
const validateRequest = require('../middleware/validateRequest');

/**
 * POST /api/contact
 */
router.post('/', contactValidationRules, validateRequest, contactController.submitContact);

module.exports = router;
