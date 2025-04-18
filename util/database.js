const { Sequelize } = require('sequelize'); 
const config = require('../config/config')
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, config.development)
// const sequelize = new Sequelize('obstructivesleepapneadb', 'root', '123456789', {
//     dialect: 'mysql',
//     host: 'localhost',
//     // dialectModule: require('mysql'), // تحديد استخدام mysql2
// });
module.exports = sequelize;