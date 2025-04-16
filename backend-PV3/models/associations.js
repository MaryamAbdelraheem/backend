// في associations.js
const { Admin, Doctor, Patient } = require('./index');
// const { Doctor } = require('./admin');
// const { Patient } = require('./patient');
// const { Admin } = require('./admin');


// 1 To M with Doctor => Patient
Doctor.hasMany(Patient);
Patient.belongsTo(Doctor);

module.exports = { Doctor, Patient, Admin };
