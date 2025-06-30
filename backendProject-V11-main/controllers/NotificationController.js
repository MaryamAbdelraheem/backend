const { Notification } = require('../models');
const NotificationService = require('../services/NotificationService');

/**
 * @method POST
 * @route /api/notifications/
 * @desc Create automatic system notification
 * @access Protected (token required)
 */
exports.createNotification = async (req, res) => {
  try {
    const notification = await NotificationService.send(req.body);
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @method GET
 * @route /api/notifications/
 * @desc Get current user's notifications
 * @access Protected (token required)
 */
exports.getMyNotifications = async (req, res) => {
  const { userId } = req; // Extracted from auth middleware
  try {
    const notifications = await Notification.findAll({
      where: { recipient_id: userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @method PATCH
 * @route /api/notifications/:id/seen
 * @desc Mark a notification as seen
 * @access Protected (token required)
 */
exports.markAsSeen = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findByPk(id);
    if (!notification)
      return res.status(404).json({ message: 'Notification not found' });

    notification.seen = true;
    await notification.save();

    res.json({ message: 'Notification marked as seen' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @method POST
 * @route /api/notifications/general
 * @desc Send a general notification (e.g. greeting, system message)
 * @access Protected (token required)
 */
exports.sendGeneral = async (req, res) => {
  try {
    const { recipient_id, type = 'GREETING', target_app } = req.body;
    const notification = await NotificationService.send({
      type,
      recipient_id,
      context_type: 'NONE',
      context_id: null,
      target_app
    });
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};