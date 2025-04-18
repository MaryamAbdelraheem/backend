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
        return res.status(400).json({ message: "Invalid gender, must be 'Male' or 'Female'" });
    }

    // Find patient by ID
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
    }

    // Update fields
    patient.firstName = firstName ?? patient.firstName;
    patient.lastName = lastName ?? patient.lastName;
    patient.phoneNumber = phoneNumber ?? patient.phoneNumber;
    patient.medicalHistory = medicalHistory ?? patient.medicalHistory;
    patient.age = age ?? patient.age;
    patient.height = height ?? patient.height;
    patient.weight = weight ?? patient.weight;
    patient.gender = normalizedGender ?? patient.gender;
    patient.img = img ?? patient.img;
    await patient.save();

    res.status(200).json({
        message: "Profile updated successfully",
        patient
    });
});
