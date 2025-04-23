//  تقوم باستدعاء associations.js لتهيئة العلاقات بعد تحميل

const { DataTypes } = require('sequelize');
const config = require('../config/config');
const sequelize = require('../util/database')

const Admin = require('./adminModel')(sequelize, DataTypes);
const Doctor = require('./doctorModel')(sequelize, DataTypes);
const Patient = require('./patientModel')(sequelize, DataTypes);
// const Appointment = require('./appointment')(sequelize, DataTypes);
// const ChatRoom = require('./chatRoom')(sequelize, DataTypes);

// استدعاء العلاقات
require('./associationsModel');

module.exports = { Admin, Doctor, Patient };
