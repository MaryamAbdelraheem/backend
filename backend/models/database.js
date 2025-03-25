const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

// Open the database
const dbPromise = open({
  filename: "./backend/db.sqlite",
  driver: sqlite3.Database,
});

module.exports = dbPromise; 