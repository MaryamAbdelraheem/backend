const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Patient } = require("../models");
const asyncHandler = require('express-async-handler');
const { generateToken } = require("../middleware/authMiddleware");

const SECRET_KEY = process.env.JWT_SECRET || "ophiucs-project-secret-jwt";


/**
 * @method POST
 * @route /api/patient/signup
 * @desc Signup a patient
 * @access public 
 */
exports.signup = asyncHandler(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        medicalHistory,
        age,
        height,
        weight,
        gender
    } = req.body;

    // Check if email already exists
    const existingPatient = await Patient.findOne({ where: { email } });
    if (existingPatient) {
        return res.status(400).json({ message: "Email already registered" });
    }

    // Validate gender
    if (gender && !["male", "female"].includes(gender.toLowerCase())) {
        return res.status(400).json({ message: "Invalid type, must be 'Male' or 'Female'" });
    }

    // Create new patient (password will be hashed in model hook)
    const patient = await Patient.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        medicalHistory,
        age,
        height,
        weight,
        gender
    });

    // Generate token
    const token = generateToken(patient, "patient");

    res.status(201).json({
        message: "The account has been created successfully",
        patient: {
            patientId: patient.patientId,
            firstName: patient.firstName,
            lastName: patient.lastName,
            email: patient.email,
            phoneNumber: patient.phoneNumber,
            medicalHistory: patient.medicalHistory,
            age: patient.age,
            height: patient.height,
            weight: patient.weight,
            gender: patient.gender
        },
        token
    });
});


/**
 * @method POST
 * @route /api/patient/login
 * @desc Login a patient
 * @access public 
 */

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Fetch patient from DB
    const patient = await Patient.findOne({ where: { email } });
    if (!patient) {
        return res.status(401).json({ message: "Invalid patient" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, patient.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid Password" });
    }

    // Generate JWT
    const token = generateToken(patient, "patient");

    res.status(200).json({
        message: "The account has been created successfully",
        patient: {
            patient_id: patient.patientId,
            first_name: patient.firstName,
            last_name: patient.lastName,
            email: patient.email,
            phone_number: patient.phoneNumber,
            medical_history: patient.medicalHistory,
            age: patient.age,
            height: patient.height,
            weight: patient.weight,
            gender: patient.gender
        },
        token
    });
});


/**
 * @method POST
 * @route /api/patient/signup
 * @desc Logout a patient
 * @access public 
 */

exports.logout = asyncHandler(async (req, res) => {
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

    res.status(200).json({
        message: "You have successfully logged out"
    });
});