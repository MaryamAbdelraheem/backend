const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Patient } = require("../models");
const asyncHandler = require('express-async-handler');
const { generateToken } = require("../middleware/authMiddleware");

// Patient Update Profile
exports.updateProfile = asyncHandler(async (req, res, next) => {
    const { id: patientId } = req.params;
    const {
        firstName,
        lastName,
        phoneNumber,
        medicalHistory,
        age,
        height,
        weight,
        gender,
        img
    } = req.body;

    const normalizedGender = gender ? gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase() : undefined;
    if (normalizedGender && !["Male", "Female"].includes(normalizedGender)) {
        return res.status(400).json({ message: "النوع غير صالح، يجب أن يكون 'Male' أو 'Female'" });
    }

    // Find patient by ID
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
        return res.status(404).json({ message: "المريض غير موجود" });
    }

    // Update fields
    patient.first_name = firstName ?? patient.first_name;
    patient.last_name = lastName ?? patient.last_name;
    patient.phone_number = phoneNumber ?? patient.phone_number;
    patient.medical_history = medicalHistory ?? patient.medical_history;
    patient.age = age ?? patient.age;
    patient.height = height ?? patient.height;
    patient.weight = weight ?? patient.weight;
    patient.gender = normalizedGender ?? patient.gender;
    patient.img = img ?? patient.img;
    await patient.save();

    res.status(200).json({
        message: "تم تحديث الملف الشخصي بنجاح",
        patient
    });
});
