const NotificationService = require('../services/NotificationService');

const NotificationController = {
  async getUserNotifications(req, res) {
    try {
      const userId = req.params.userId;
      const notifications = await NotificationService.getUserNotifications(userId);
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async markAsSeen(req, res) {
    try {
      const notificationId = req.params.id;
      await NotificationService.markAsSeen(notificationId);
      res.status(200).json({ message: 'Notification marked as seen' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async sendGeneral(req, res) {
    try {
      const { message, recipient_id, title } = req.body;
      const notification = await NotificationService.sendGeneral(message, recipient_id, title);
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = NotificationController;