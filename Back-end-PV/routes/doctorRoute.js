const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctorController');
const authDoctorController = require('../controller/authDoctorController');
const { loginValidationRules } = require('../validators/authValidator');
const validateRequest = require('../middleware/validateRequest');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

// Public routes
router.post(
    '/login',
    loginValidationRules(),
    validateRequest,
    authDoctorController.login
);

// Protected routes - require doctor role
router.get('/:id', 
    authenticateToken,
    authorizeRole('doctor'),
    doctorController.getProfile
);

router.get('/:id/patients',
    authenticateToken,
    authorizeRole('doctor'),
    doctorController.getPatients
);

router.get('/:doctorId/patients/:patientId',
    authenticateToken,
    authorizeRole('doctor'),
    doctorController.getPatientProfile
);

router.post('/logout',
    authenticateToken,
    authorizeRole('doctor'),
    authDoctorController.logout
);

module.exports = router;