const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load env variables

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key"; // Use env variable

// Middleware to protect routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden: Invalid token" });

    req.user = user; // Attach user info to request
    next();
  });
}

// Generate JWT token
function generateToken(admin) {
  return jwt.sign(
    { id: admin.id, email: admin.email, role: "admin" }, // Add role for authorization
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = { authenticateToken, generateToken };