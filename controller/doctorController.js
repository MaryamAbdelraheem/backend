const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Doctor } = require('../models'); // استيراد موديل الطبيب
const { generateToken } = require("../middleware/authMiddleware");

// كل ال auth الي تخص الDoctor موجوده في authDoctorController


// لو في اي لوجيك تاني هيتكتب هنا