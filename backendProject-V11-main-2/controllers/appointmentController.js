// controller/appointmentController.js
const { Appointment, Notification, Patient } = require("../models");
const asyncHandler = require("express-async-handler");

exports.createAppointment = asyncHandler(async (req, res) => {
    const doctorId = req.user.id; // من التوكن
    const { patient_id, appointment_date, } = req.body;

    // Check if the patient exists
    const patient = await Patient.findByPk(patient_id);
    if (!patient) {
        return res.status(404).json({ message: "Patient not found." });
    }

    // Create Appointment
    const appointment = await Appointment.create({
        DoctorDoctorId: doctorId,
        PatientPatientId: patient_id,
        appointment_date,
    });
    res.status(201).json({
        status: "success",
        message: "Appointment created successfully",
        data: {
            appointment
        }
    });
});
