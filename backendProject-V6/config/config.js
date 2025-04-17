
const config = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT
    },
    test: {
        // إعدادات البيئة الاختبارية
    },
    production: {
        // إعدادات البيئة الإنتاجية
    }
};

// // طباعة القيم للتحقق منها
// console.log('====== إعدادات قاعدة البيانات ======');
// console.log('اسم المستخدم:', process.env.DB_USERNAME || 'غير معروف');
// console.log('كلمة المرور:', process.env.DB_PASSWORD ? '******' : 'غير معروفة');
// console.log('اسم قاعدة البيانات:', process.env.DB_NAME || 'غير معروف');
// console.log('الخادم:', process.env.DB_HOST || 'غير معروف');
// console.log('نوع قاعدة البيانات:', process.env.DB_DIALECT || 'غير معروف');
// console.log('المنفذ:', process.env.DB_PORT || 'غير معروف');
// console.log('====================================');

module.exports = config;