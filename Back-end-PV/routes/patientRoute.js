const express = require("express");
const router = express.Router();
const patientController = require("../controller/patientController");
const { loginValidationRules } = require("../validators/authValidator");
const validateRequest = require("../middleware/validateRequest");
const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware");
const authPatientController = require('../controller/authPatientController');

// Public routes
router.post("/signup", authPatientController.signup);
router.post("/login", 
    loginValidationRules(),
    validateRequest,
    authPatientController.login
);

// Protected routes - require patient role
router.get("/:id",
    authenticateToken,
    authorizeRole('patient'),
    patientController.getProfile
);

router.put("/:id",
    authenticateToken,
    authorizeRole('patient'),
    patientController.updateProfile
);

router.post("/logout", 
    authenticateToken,
    authorizeRole('patient'),
    authPatientController.logout
);

module.exports = router;