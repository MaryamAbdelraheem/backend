const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Doctor = require('../models/doctor'); // استيراد موديل الطبيب
const { generateToken } = require("../middleware/authMiddleware");


const SECRET_KEY = process.env.JWT_SECRET || 'ophiucs-project-secret-jwt';

exports.login = async (req, res, next) => {
    try {
        

        //fetching from DB
        // البحث عن الطبيب في قاعدة البيانات
        const doctor = await Doctor.findOne({ where: { email } });
        if (!doctor) {
            return res.status(401).json({ message: 'بيانات الاعتماد غير صحيحة' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'بيانات الاعتماد غير صحيحة' });
        }

        // Generate JWT
        const token = generateToken(doctor, "doctor");

        res.status(200).json({
            message: 'تم تسجيل الدخول بنجاح',
            doctor: {
                doctor_id: doctor.doctor_id,
                first_name: doctor.first_name,
                last_name: doctor.last_name,
                email: doctor.email,
                phone_number: doctor.phone_number,
                specialization: doctor.specialization,
                gender: doctor.gender
            },
            token
        });

    } catch (error) {
        next(error);
    }
};

const tokenBlacklist = new Set();

exports.logout = async (req, res) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1];

        // Optionally: Verify token before blacklisting
        try {
            jwt.verify(token, SECRET_KEY);
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Add token to blacklist
        tokenBlacklist.add(token);

        res.status(200).json({ message: "تم تسجيل الخروج بنجاح" });

    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء تسجيل الخروج", error: error.message });
    }
};




