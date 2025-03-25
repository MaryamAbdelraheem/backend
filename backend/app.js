const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { getAdminByEmail } = require("./models/Admin");
const { generateToken, authenticateToken } = require("./middleware/authMiddleware");

//dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Admin Login (with bcrypt for password security)
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await getAdminByEmail(email);

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" }); // Generic message
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" }); // No password leaks
    }

    const token = generateToken(admin);
    res.json({ message: "Login successful", token });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Protected Route Example (Dashboard)
app.get("/api/dashboard", authenticateToken, (req, res) => {
  res.json({ message: `Welcome, Admin!`, admin: req.admin });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});