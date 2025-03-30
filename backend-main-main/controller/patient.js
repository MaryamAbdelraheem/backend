const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Patient = require("../models/patient");
const { generateToken } = require("../middleware/authMiddleware");


const SECRET_KEY = process.env.JWT_SECRET || "ophiucs-project-secret-jwt";


// Patient Signup
exports.signup = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, phone_number, medical_history, age, height, weight, img } = req.body;

        // Check if email already exists
        const existingPatient = await Patient.findOne({ where: { email } });
        if (existingPatient) {
            return res.status(400).json({ message: "البريد الإلكتروني مسجل بالفعل" });
        }

        


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new patient
        const patient = await Patient.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            phone_number,
            medical_history,
            age,
            height,
            weight,
            img
        });


        // Generate token
        const token = generateToken(patient, "patient");


        res.status(201).json({
            message: "تم إنشاء الحساب بنجاح",
            patient: {
                patient_id: patient.patient_id,
                first_name: patient.first_name,
                last_name: patient.last_name,
                email: patient.email,
                phone_number: patient.phone_number,
                medical_history: patient.medical_history,
                age: patient.age,
                height: patient.height,
                weight: patient.weight,
                img: patient.img
            },
            token
        });

    } catch (error) {
        next(error);
    }
};

// Patient Login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Fetch patient from DB
        const patient = await Patient.findOne({ where: { email } });
        if (!patient) {
            return res.status(401).json({ message: "بيانات الاعتماد غير صحيحة" });
        }

        
        // Verify password
        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
            return res.status(401).json({ message: "بيانات الاعتماد غير صحيحة" });
        }

        // Generate JWT
        const token = generateToken(patient, "patient");

        res.status(200).json({
            message: "تم تسجيل الدخول بنجاح",
            patient: {
                patient_id: patient.patient_id,
                first_name: patient.first_name,
                last_name: patient.last_name,
                email: patient.email,
                phone_number: patient.phone_number,
                medical_history: patient.medical_history,
                age: patient.age,
                height: patient.height,
                weight: patient.weight,
                img: patient.img
            },
            token
        });

    } catch (error) {
        next(error);
    }
};

// Patient Logout
exports.logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1];

        // Verify token before blacklisting
        try {
            jwt.verify(token, SECRET_KEY);
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Store blacklisted tokens 
        const tokenBlacklist = new Set();
        // Add token to blacklist
        tokenBlacklist.add(token);

        res.status(200).json({ message: "تم تسجيل الخروج بنجاح" });

    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء تسجيل الخروج", error: error.message });
    }
};