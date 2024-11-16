const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.resolve(__dirname, "mindmate.db"),
  (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
    } else {
      console.log("Connected to the SQLite database.");
    }
  }
);

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (address TEXT);", (err) => {
    if (err) {
      console.error("Error creating users table: ", err.message);
    } else {
      console.log("Users table is ready.");
    }
  });

  db.run(
    "CREATE TABLE IF NOT EXISTS therapists (address TEXT, image TEXT);",
    (err) => {
      if (err) {
        console.error("Error creating therapists table:", err.message);
      } else {
        console.log("Therapists table is ready.");
      }
    }
  );
});

module.exports = db;
