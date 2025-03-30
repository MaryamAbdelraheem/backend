const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin');
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
    res.json({ message: "مرحبًا بك في لوحة التحكم", user: req.user });
  });


module.exports = router;