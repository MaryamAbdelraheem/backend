// const { DataTypes } = require('sequelize');
// const sequelize = require('../util/database')


// const Vitals = sequelize.define('Vitals', {
//     vitals_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     movement_intensity: DataTypes.FLOAT,
//     temperature: DataTypes.FLOAT,
//     airFlow: DataTypes.FLOAT,
//     balance: DataTypes.FLOAT,
//     systolic_pressure: DataTypes.FLOAT,
//     diastolic_pressure: DataTypes.FLOAT,
//     heart_rate: DataTypes.FLOAT,
//     oxygen_saturation: DataTypes.FLOAT,
//     timestamp: DataTypes.DATE
// }, {
//     timestamps: false
// });

// // العلاقات
// Vitals.belongsTo(Device, { foreignKey: 'device_id' });
// Vitals.belongsTo(Patient, { foreignKey: 'patient_id' });

// module.exports = Vitals;