const express = require('express');
const router = express.Router();
const {
  getNotifications,
  createNotification,
  markAsRead
} = require('../controllers/notificationController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/', getNotifications);
router.post('/', authorize('Admin', 'Policymaker', 'Institution'), createNotification);
router.put('/:id/read', markAsRead);

module.exports = router;
