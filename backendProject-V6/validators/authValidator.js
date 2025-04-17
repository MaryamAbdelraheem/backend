const { body } = require('express-validator');

exports.loginValidationRules = () => [
    body('email')
        .notEmpty().withMessage('البريد الإلكتروني مطلوب')
        .isEmail().withMessage('يجب إدخال بريد إلكتروني صالح'),

    body('password')
        .notEmpty().withMessage('كلمة المرور مطلوبة')
        .isLength({ min: 8 }).withMessage('يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل')
];