const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctor');
const { loginValidationRules } = require('../validators/authValidator');
const validateRequest = require('../middleware/validateRequest');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post(
    '/login',
    loginValidationRules(),
    validateRequest,
    doctorController.login
);
router.post('/logout', 
    authenticateToken, 
    doctorController.logout); // New logout route

module.exports = router;