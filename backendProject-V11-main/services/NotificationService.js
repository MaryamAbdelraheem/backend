const { Notification } = require('../models');

class NotificationService {
  static async send({
    type,
    message,
    recipient_id,
    sender_id = null,
    context = {}, // { context_type, context_id }
    title = null,
    priority = 'MEDIUM',
    target_app = 'BOTH',
    delivery_method = 'IN_APP',
    scheduled_at = null
  }) {
    const { context_type = 'NONE', context_id = null } = context;

    return await Notification.create({
      type,
      title,
      message,
      recipient_id,
      sender_id,
      context_type,
      context_id,
      priority,
      target_app,
      delivery_method,
      scheduled_at
    });
  }

  static async markAsSeen(notificationId) {
    return await Notification.update(
      { seen: true },
      { where: { notification_id: notificationId } }
    );
  }

  static async getUserNotifications(userId) {
    return await Notification.findAll({
      where: { recipient_id: userId },
      order: [['createdAt', 'DESC']]
    });
  }

  static async sendGeneral(message, recipient_id, title = null) {
    return await this.send({
      type: 'GENERAL',
      message,
      recipient_id,
      title,
      context: { context_type: 'NONE' }
    });
  }
}

module.exports = NotificationService;





