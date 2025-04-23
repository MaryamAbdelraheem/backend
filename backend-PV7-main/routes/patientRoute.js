const express = require("express");
const router = express.Router();
const patientController = require("../controller/patientController");
const { loginValidationRules } = require("../validators/authValidator");
const validateRequest = require("../middleware/validateRequest");
const { authenticateToken } = require("../middleware/authMiddleware");
const authPatientController = require('../controller/authPatientController');

router.post("/signup", 
    authPatientController.signup
);
router.post("/login", 
    loginValidationRules(), 
    validateRequest, 
    authPatientController.login
);
router.post("/logout", 
    authenticateToken, 
    authPatientController.logout
);
router.put("/:id", 
    patientController.updateProfile
);

module.exports = router;