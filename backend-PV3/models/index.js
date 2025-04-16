//  تقوم باستدعاء associations.js لتهيئة العلاقات بعد تحميل

const { DataTypes } = require('sequelize');
const config = require('../config/config');
const sequelize = require('../util/database')

const Admin = require('./admin')(sequelize, DataTypes);
const Doctor = require('./doctor')(sequelize, DataTypes);
const Patient = require('./patient')(sequelize, DataTypes);
// const Appointment = require('./appointment')(sequelize, DataTypes);
// const ChatRoom = require('./chatRoom')(sequelize, DataTypes);

// استدعاء العلاقات
require('./associations');

module.exports = { Admin, Doctor, Patient };
