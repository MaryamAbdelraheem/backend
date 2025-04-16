const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
        doctorId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 100]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        specialization: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // adminId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'admins',
        //         key: 'adminId' // يجب أن يتطابق مع PK في جدول admins
        //     },
        //     onUpdate: 'CASCADE',
        //     onDelete: 'RESTRICT'
        // }
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'doctors'
    });

   
    // تشفير كلمة المرور قبل الحفظ (داخل نطاق الدالة)
    Doctor.beforeCreate(async (doctor) => {
        if (doctor.password) {
            const salt = await bcrypt.genSalt(10);
            doctor.password = await bcrypt.hash(doctor.password, salt);
        }
    });

    return Doctor; // تصدير النموذج مرة واحدة
};