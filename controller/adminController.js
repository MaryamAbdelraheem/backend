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

    // Verify password after removing whitespace
    const isMatch = await bcrypt.compare(password.trim(), admin.password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = generateToken(admin, "admin");

    // Hide password when sending data
    const adminData = { ...admin };
    delete adminData.password;

    // Send response to client
    res.status(200).json({
        message: 'Login successful',
        admin: adminData,
        token,
    });
});

// //Chat

// exports.login = asyncHandler(async (req, res, next) => {
//     const { email, password } = req.body;

//     const admin = adminUser.find(user => user.email === email.trim());
//     if (!admin) {
//         return res.status(401).json({ message: 'بيانات الاعتماد غير صحيحة' });
//     }

//     const isMatch = await bcrypt.compare(password.trim(), admin.password);
//     if (!isMatch) {
//         return res.status(401).json({ message: 'بيانات الاعتماد غير صحيحة' });
//     }

//     const token = generateToken(admin, "admin");

//     const adminData = { ...admin };
//     delete adminData.password;

//     res.status(200).json({
//         message: 'تم تسجيل الدخول بنجاح',
//         admin: adminData,
//         token,
//     });
// });
