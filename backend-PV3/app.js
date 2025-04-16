const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { getAdminByEmail } = require("./models/admin");
const { generateToken, authenticateToken } = require("./middleware/authMiddleware");


// استيراد العلاقات
require('./models/associations');


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
const adminRoutes = require('./routes/admin');
const doctorRoutes = require('./routes/doctor');
const patientRoutes = require('./routes/patient');



// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/patient', patientRoutes);



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



// // دالة لإضافة بيانات أولية
// const seedInitialData = async () => {
//   try {
//     const adminCount = await Admin.count();
//     if (adminCount === 0) {
//       const admin = await Admin.create({
//         firstName: 'Admin',
//         lastName: 'User',
//         email: 'admin@example.com',
//         password: 'Admin@123'
//       });

//       const doctor = await Doctor.create({
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'doctor@example.com',
//         password: 'Doctor@123',
//         phoneNumber: '0123456789',
//         specialization: 'General',
//         adminId: admin.adminId
//       });

//       await Patient.create({
//         firstName: 'Jane',
//         lastName: 'Smith',
//         email: 'patient@example.com',
//         password: 'Patient@123',
//         phoneNumber: '0123456789',
//         gender: 'Female',
//         medicalHistory: 'No known allergies',
//         age: 30,
//         height: 170,
//         weight: 65,
//         img: 'default.jpg',
//         doctorId: doctor.doctorId,
//         adminId: admin.adminId
//       });

//       console.log('تم إضافة البيانات الأولية بنجاح');
//     }
//   } catch (error) {
//     console.error('حدث خطأ أثناء إضافة البيانات الأولية:', error);
//   }
// };

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Running server on port${port}`);
});
sequelize.sync().then(() => {
}).catch(err => {
  console.error('فشل في بدء الخادم:', err);
});