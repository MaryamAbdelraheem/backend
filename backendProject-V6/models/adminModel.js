const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
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
                isEmail: true
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
        timestamps: true,
        paranoid: true,
        tableName: 'admins'
    });

    // // طباعة تفاصيل النموذج للتحقق
    // console.log('====== تفاصيل نموذج Admin ======');
    // console.log('table:', Admin.tableName);
    // console.log('fields:', Object.keys(Admin.rawAttributes));
    // console.log('optiens:', {
    //     timestamps: Admin.options.timestamps,
    //     paranoid: Admin.options.paranoid,
    //     tableName: Admin.options.tableName
    // });


    // تشفير كلمة المرور قبل الحفظ (داخل نطاق الدالة)
    Admin.beforeCreate(async (admin) => {
        if (admin.password) {
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(admin.password, salt);
        }
    });


    // // إنشاء بيانات تجريبية للتحقق
    // const testAdmin = Admin.build({
    //     firstName: 'Test',
    //     lastName: 'Admin',
    //     email: 'test@example.com',
    //     password: 'Test1234'
    // });

    // console.log('\n====== بيانات تجريبية ======');
    // console.log('قبل الحفظ:', testAdmin.toJSON());



    return Admin; // تصدير النموذج مرة واحدة فقط
};