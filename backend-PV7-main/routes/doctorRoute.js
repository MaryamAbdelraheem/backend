const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctorController');
const authDoctorController = require('../controller/authDoctorController');
const { loginValidationRules } = require('../validators/authValidator');
const validateRequest = require('../middleware/validateRequest');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post(
    '/login',
    loginValidationRules(),
    validateRequest,
    authDoctorController.login
);
router.post('/logout',
    authenticateToken,
    authDoctorController.logout
); 

module.exports = router;