const express = require('express');
const router = express.Router();
const { getInquiries, updateInquiryStatus, deleteInquiry, replyInquiry } = require('../controllers/inquiryController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.route('/').get(getInquiries);
router.route('/:id').put(updateInquiryStatus).delete(deleteInquiry);
router.route('/:id/reply').post(replyInquiry);

module.exports = router;
