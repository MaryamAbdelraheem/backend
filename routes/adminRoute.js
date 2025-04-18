const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const { loginValidationRules } = require('../validators/authValidator');
const validateRequest = require('../middleware/validateRequest');//POST /api/admin / login
const { authenticateToken, generateToken } = require("../middleware/authMiddleware");

router.post(
    '/login',
    loginValidationRules(),
    validateRequest,
    adminController.login
);


router.get("/dashboard", authenticateToken, (req, res) => {
    res.json({ message: "Welcome to the dashboard", user: req.user });
  });


module.exports = router;