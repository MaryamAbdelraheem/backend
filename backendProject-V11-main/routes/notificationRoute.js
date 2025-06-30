const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/NotificationController');

router.get('/:userId', NotificationController.getUserNotifications);
router.patch('/:id/seen', NotificationController.markAsSeen);
router.post('/general', NotificationController.sendGeneral);




module.exports = router;