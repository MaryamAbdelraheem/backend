// models/appointmentModel.js       //encapsulation for notification
module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
      appointment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      appointment_date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      timestamps: true
    });
  
    // Method: send notification to the patient
    Appointment.prototype.sendNotificationToPatient = async function (patientId) {
      const NotificationService = require('../services/NotificationService');
  
      const dateStr = this.appointment_date.toLocaleString('ar-EG', {
        dateStyle: 'full',
        timeStyle: 'short'
      });
  
      const message = `تم حجز موعد جديد بتاريخ ${dateStr}`;
      
      return await NotificationService.send({
        type: 'APPOINTMENT',
        message,
        recipient_id: patientId,
        context: {
          context_type: 'APPOINTMENT',
          context_id: this.appointment_id
        }
      });
    };
  
    return Appointment;
  };
