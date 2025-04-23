// const { DataTypes } = require('sequelize');
// const sequelize = require('../util/database')

// const Appointment = sequelize.define('Appointment', {
//     appointment_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     appointment_date: DataTypes.DATE,
//     status: DataTypes.STRING
// }, {
//     timestamps: false
// });

// // العلاقات
// Appointment.belongsTo(Doctor, { foreignKey: 'doctor_id' });
// Appointment.belongsTo(Patient, { foreignKey: 'patient_id' });
// Admin.hasMany(Appointment, { foreignKey: 'admin_id' });

// module.exports = Appointment;