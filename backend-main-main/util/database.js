const { Sequelize } = require('sequelize'); 

const sequelize = new Sequelize('obstructivesleepapneadb', 'root', '123456789', {
    dialect: 'mysql',
    host: 'localhost',
    // dialectModule: require('mysql2'), // تحديد استخدام mysql2
});

module.exports = sequelize;