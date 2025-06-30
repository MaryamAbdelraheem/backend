const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
const { loginValidationRules } = require("../validators/authValidator");
const {validateRequest} = require("../middleware/validateRequest");
const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware");
const authPatientController = require('../controllers/authPatientController');

// Public routes
/**
 * @route /api/patient/signup
 * @access public
 */
router
    .route('/signup')
    .post(authPatientController.signup)

/**
 * @route /api/patient/login
 * @access public
 */
router
    .route('/login')
    .post(
        loginValidationRules(),
        validateRequest,
        authPatientController.login
    );

// Public routes
// router.post("/signup", authPatientController.signup);
// router.post("/login", 
//     loginValidationRules(),
//     validateRequest,
//     authPatientController.login
// );

// Protected routes - require patient role
/**
 * @route /api/patient/logout
 * @access Protected 
 */
router
    .route('/logout')
    .post(
        authenticateToken,
        authorizeRole('patient'),
        authPatientController.logout
    );
    
/**
 * @route /api/patient/:id
 * @access Protected 
 */
router
    .route('/:id')
    .get(
        authenticateToken,
        authorizeRole('patient'),
        patientController.getProfile
    )
    .put(
        authenticateToken,
        authorizeRole('patient'),
        patientController.updateProfile
    )

    
// router.get("/:id",
//     authenticateToken,
//     authorizeRole('patient'),
//     patientController.getProfile
// );

// router.put("/:id",
//     authenticateToken,
//     authorizeRole('patient'),
//     patientController.updateProfile
// );

// router.post("/logout",
//     authenticateToken,
//     authorizeRole('patient'),
//     authPatientController.logout
// );

module.exports = router;