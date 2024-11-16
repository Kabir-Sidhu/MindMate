const express = require("express");
const router = express.Router();
const db = require("../database.js");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const hashPassword = async (plainPassword) => {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  return hashedPassword;
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT password FROM users WHERE email = ?`,
      [email],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

router.post("/auth/signup", async (req, res) => {
  const { username, password, email, name } = req.body;
  const uuid = uuidv4();

  db.get(
    `SELECT * FROM users WHERE username = ? OR email = ?`,
    [username, email],
    async (err, row) => {
      if (err) {
        console.error(
          "Error checking for duplicate username/email:",
          err.message
        );
        return res.status(500).send({
          status: 500,
          error: "Internal server error",
        });
      }

      if (row) {
        return res.status(400).send({
          status: 400,
          error: "Username or email already exists",
        });
      }

      try {
        const hashedPw = await hashPassword(password);

        db.run(
          `INSERT INTO users (uuid, username, email, password, name) VALUES (?, ?, ?, ?, ?)`,
          [uuid, username, email, hashedPw, first_name, last_name],
          function (err) {
            if (err) {
              console.error("Error inserting user:", err.message);
              res.status(400).send({
                status: 400,
                error: `${err.message}`,
              });
            } else {
              console.log("A new row has been inserted with ID:", this.lastID);
              res.status(200).send({
                status: 200,
                message: "User registered successfully",
              });
            }
          }
        );
      } catch (error) {
        console.error("Error hashing password:", error.message);
        res.status(500).send({
          status: 500,
          error: "Internal server error while hashing password",
        });
      }
    }
  );
});

router.post("/auth/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const row = await getUserByEmail(email);
    if (!row) {
      return res.status(401).send({
        status: 401,
        error: "Invalid email or password",
      });
    }

    const hashedPw = row.password;

    const isMatch = await comparePassword(password, hashedPw);

    if (isMatch) {
      res.status(200).send({
        status: 200,
        message: "Login successful",
      });
    } else {
      res.status(401).send({
        status: 401,
        error: "Invalid username or password",
      });
    }
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).send({
      status: 500,
      error: err.message,
    });
  }
});

module.exports = router;
