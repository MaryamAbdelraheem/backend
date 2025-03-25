const dbPromise = require("./database");

async function getAdminByEmail(email) {
  const db = await dbPromise;
  return db.get(`SELECT * FROM admin WHERE email = ?`, [email]);
}

module.exports = { getAdminByEmail };