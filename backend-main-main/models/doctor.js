const { DataTypes } = require('sequelize');
const sequelize = require('../util/database')

const Doctor = sequelize.define('Doctor', {
    doctor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    specialization: DataTypes.STRING,
    gender: DataTypes.STRING
}, {
    timestamps: false
});

module.exports = Doctor;