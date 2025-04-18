const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { getAdminByEmail } = require("./models/adminModel");
const { generateToken, authenticateToken } = require("./middleware/authMiddleware");
const errorHandlerMiddleware = require('./middleware/errorHandler');

// استيراد العلاقات
require('./models/associationsModel');


//console.log("JWT_SECRET:", process.env.JWT_SECRET);
//console.log("JWT_EXPIRES_IN:", process.env.JWT_EXPIRES_IN);

// dotenv.config(); // Load environment variables
const sequelize = require('./util/database')
const { Admin, Doctor, Patient } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());  // لتحليل طلبات JSON
app.use(express.urlencoded({ extended: true })); // لتحليل بيانات النماذج

// import routes app
const adminRoutes = require('./routes/adminRoute');
const doctorRoutes = require('./routes/doctorRoute');
const patientRoutes = require('./routes/patientRoute');


// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/patient', patientRoutes);


// Error handler and handler not found
app.use(errorHandlerMiddleware.notFoundHandler);
app.use(errorHandlerMiddleware.errorHandler);


// // Admin Login (with bcrypt for password security)
// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const admin = await getAdminByEmail(email);

//     if (!admin) {
//       return res.status(401).json({ message: "Invalid credentials" }); // Generic message
//     }

//     const passwordMatch = await bcrypt.compare(password, admin.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: "Invalid credentials" }); // No password leaks
//     }

//     const token = generateToken(admin);
//     res.json({ message: "Login successful", token });

//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Running server on port${port}`);
});
sequelize.sync().then(() => {
}).catch(err => {
  console.error('Failed to start server:', err);
});