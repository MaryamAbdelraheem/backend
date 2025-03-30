const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateToken } = require("../middleware/authMiddleware");

const SECRET_KEY = process.env.JWT_SECRET || 'ophiucs-project-secret-jwt';

// إنشاء كلمة مرور مشفرة مسبقًا
const plainPassword = 'admin@pannel$12324';
const hashedPassword = bcrypt.hashSync(plainPassword, 10);

// بيانات المسؤول (يجب استبدالها بقاعدة بيانات في المستقبل)
const adminUser = [
    { id: 1, email: 'admin@example.com', password: hashedPassword }
];

exports.login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const admin = adminUser.find(user => user.email === email);
        if (!admin) {
            return res.status(401).json({ message: 'بيانات الاعتماد غير صحيحة' });
        }

        // التحقق من صحة كلمة المرور بعد إزالة المسافات البيضاء
        const isMatch = await bcrypt.compare(password.trim(), admin.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'بيانات الاعتماد غير صحيحة' });
        }

        // إنشاء رمز JWT
        const token = generateToken(admin, "admin");

        // إخفاء كلمة المرور عند إرسال البيانات
        const adminData = { ...admin };
        delete adminData.password;

        // إرسال الاستجابة إلى العميل
        res.status(200).json({
            message: 'تم تسجيل الدخول بنجاح',
            admin: adminData,
            token,
        });
    } catch (error) {
        next(error);
    }
};