// const { DataTypes } = require('sequelize');
// const sequelize = require('../util/database')

// const Notification = sequelize.define('Notification', {
//     notification_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     message: DataTypes.TEXT,
//     timeStamp: DataTypes.DATE,
//     type: DataTypes.STRING
// }, {
//     timestamps: false
// });

// // العلاقات
// Notification.belongsTo(Doctor, { foreignKey: 'doctor_id' });
// Notification.belongsTo(Patient, { foreignKey: 'patient_id' });
// Notification.belongsTo(Appointment, { foreignKey: 'appointment_id' });

// module.exports = Notification;