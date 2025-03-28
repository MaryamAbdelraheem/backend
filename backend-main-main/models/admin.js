const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const bcrypt = require('bcryptjs'); // تأكد من استيراد bcrypt

const Admin = sequelize.define('Admin', {
    adminId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // يمكنك تفعيل التحقق من صيغة البريد
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 100]
        }
    }
}, { 
    timestamps: true, // يضيف createdAt و updatedAt
    paranoid: true,   // يفعل الحذف الناعم
    tableName: 'admins' // اسم الجدول في قاعدة البيانات
});

// تشفير كلمة المرور قبل الحفظ
Admin.beforeCreate(async (admin) => {
    if (admin.password) {
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
    }
});

module.exports = Admin;