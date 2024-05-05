const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const sportsbookingRoutes = require("./routes/sportsbooking.route.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is Connected.");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
  console.log("Server is Running on Port 3000!");
});

// Use cors middleware with options to allow requests from specific origin
app.use(
  cors({
    origin: "http://localhost:3001", // Update with your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Enable cookies
  })
);

app.use("/api/sportsbooking", sportsbookingRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error.";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

module.exports = app;
