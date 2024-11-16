const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const authApi = require("./api/auth.js");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", authApi);
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
