const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const { loginValidationRules } = require('../validators/authValidator');
const validateRequest = require('../middleware/validateRequest');//POST /api/admin / login
const { authenticateToken, generateToken, authorizeRole } = require("../middleware/authMiddleware");

router.post(
    '/login',
    loginValidationRules(),
    validateRequest,
    adminController.login
);

router.get("/dashboard", 
    authenticateToken,
    authorizeRole('admin'),
    (req, res) => {
        res.json({ message: "Welcome to the dashboard", user: req.user });
    }
);

router.get('/users/doctors', 
    authenticateToken,
    authorizeRole('admin'),
    adminController.viewDoctors //Done
);

router.post('/users/doctors', 
    authenticateToken,
    authorizeRole('admin'),
    adminController.addDoctor //Done
);

router.delete('/users/doctors/:id', 
    authenticateToken,
    authorizeRole('admin'),
    adminController.deleteDoctor //Done
);


module.exports = router;