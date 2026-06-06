const express = require('express');
const router = express.Router();
const { getInquiries, updateInquiryStatus, deleteInquiry } = require('../controllers/inquiryController');
const { protect, authorize } = require('../middleware/auth');

// All inquiry routes require admin authentication
router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(getInquiries);

router.route('/:id')
  .put(updateInquiryStatus)
  .delete(deleteInquiry);

module.exports = router;
