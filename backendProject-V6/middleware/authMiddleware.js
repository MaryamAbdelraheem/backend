const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load env variables

const SECRET_KEY = process.env.SECRET_KEY || "ophiucs-project-secret-jwt"; // Use env variable

// Middleware to protect routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];


  if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });


  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden: Invalid token" });

    req.user = user; // Attach user info to request
    next();
  });
}

// Generate JWT token
function generateToken(user, role = "user") {
  return jwt.sign(
    { id: user.id, email: user.email, role }, // Role is now dynamic
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}



module.exports = { authenticateToken, generateToken };