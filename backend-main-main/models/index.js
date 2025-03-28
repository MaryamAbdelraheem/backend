// const fs = require('fs');
// const path = require('path');
// const { Sequelize, DataTypes } = require('sequelize');
// const config = require('../config/config');

// const basename = path.basename(__filename);
// const db = {};

// const sequelize = new Sequelize(
//     config.development.database,
//     config.development.username,
//     config.development.password,
//     {
//         host: config.development.host,
//         dialect: config.development.dialect,
//         logging: false
//     }
// );

// // تحميل النماذج
// fs.readdirSync(__dirname)
//     .filter(file => {
//         return (
//             file.indexOf('.') !== 0 &&
//             file !== basename &&
//             file.slice(-3) === '.js' &&
//             file !== 'associations.js'
//         );
//     })
//     .forEach(file => {
//         try {
//             const model = require(path.join(__dirname, file))(sequelize, DataTypes);
//             db[model.name] = model;
//         } catch (error) {
//             console.error(`Error loading model ${file}:`, error);
//         }
//     });

// // تحميل العلاقات
// require('./associations')(db);

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;