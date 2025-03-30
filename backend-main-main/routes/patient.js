const express = require("express");
const router = express.Router();
const patientController = require("../controller/patient");
const { loginValidationRules } = require("../validators/authValidator");
const validateRequest = require("../middleware/validateRequest");
const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/signup", 
    patientController.signup
);
router.post("/login", 
    loginValidationRules(), 
    validateRequest, 
    patientController.login
);
router.post("/logout", 
    authenticateToken, 
    patientController.logout
);

module.exports = router;