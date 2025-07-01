const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { getAdminByEmail } = require("./models/adminModel");
const { generateToken, authenticateToken } = require("./middleware/authMiddleware");
const {errorHandler, notFoundHandler} = require('./middleware/errorHandler');

// استيراد العلاقات
require('./models/associationsModel');


//console.log("JWT_SECRET:", process.env.JWT_SECRET);
//console.log("JWT_EXPIRES_IN:", process.env.JWT_EXPIRES_IN);

// dotenv.config(); // Load environment variables
const sequelize = require('./util/database')

const app = express();
app.use(cors());
app.use(express.json());  // لتحليل طلبات JSON
app.use(express.urlencoded({ extended: true })); // لتحليل بيانات النماذج

// import routes app
const adminRoutes = require('./routes/adminRoute');
const doctorRoutes = require('./routes/doctorRoute');
const patientRoutes = require('./routes/patientRoute');
const appointmentRoutes = require('./routes/appointmentRoute');
const notificationRoutes = require('./routes/notificationRoute'); // 


// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/notifications', notificationRoutes); 



// Error handler and handler not found
app.use(notFoundHandler);
app.use(errorHandler);


sequelize.sync({ force: false})
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Running server on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
  });