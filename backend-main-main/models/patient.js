const { DataTypes } = require('sequelize');
const sequelize = require('../util/database')

const Patient = sequelize.define('Patient', {
    patient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    medical_history: DataTypes.TEXT,
    age: DataTypes.INTEGER,
    height: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    img: DataTypes.STRING
}, {
    timestamps: false
});

module.exports = Patient;