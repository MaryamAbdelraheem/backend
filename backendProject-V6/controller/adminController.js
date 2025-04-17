const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { generateToken } = require("../middleware/authMiddleware");

const SECRET_KEY = process.env.JWT_SECRET || 'ophiucs-project-secret-jwt';

// إنشاء كلمة مرور مشفرة مسبقًا
const plainPassword = 'admin@pannel$12324';
const hashedPassword = bcrypt.hashSync(plainPassword, 10);

// بيانات المسؤول (يجب استبدالها بقاعدة بيانات في المستقبل)
const adminUser = [
    { id: 1, email: 'admin@example.com', password: hashedPassword }
];

exports.login = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;

    const admin = adminUser.find(user => user.email === email);
    if (!admin) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // التحقق من صحة كلمة المرور بعد إزالة المسافات البيضاء
    const isMatch = await bcrypt.compare(password.trim(), admin.password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // إنشاء رمز JWT
    const token = generateToken(admin, "admin");

    // إخفاء كلمة المرور عند إرسال البيانات
    const adminData = { ...admin };
    delete adminData.password;

    // إرسال الاستجابة إلى العميل
    res.status(200).json({
        message: 'Logged in successfully',
        admin: adminData,
        token,
    });
});
