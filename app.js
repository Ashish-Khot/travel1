const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth");
const guideProfileRouter = require('./routes/guideProfile');
const guideRouter = require('./routes/guide');
const bookingRouter = require('./routes/booking');

const app = express();

connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use("/api", authRouter);
app.use('/api/guide/profile', guideProfileRouter); // Authenticated guide profile routes (GET/PUT)
app.use('/api/guide', guideRouter); // Public guide routes (GET by userId, etc)
app.use('/api/booking', bookingRouter); // Booking routes

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;
