const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

/* ---------------- Middleware ---------------- */
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://minicarengo.onrender.com" // frontend URL after deploy
    ],
    credentials: true
  })
);

/* ---------------- Database ---------------- */
connectDB();

/* ---------------- Routes ---------------- */

app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

app.get("/ping", (req, res) => {
  const num = Math.floor(Math.random() * 100);
  const calc = num * num + 5;

  res.json({
    success: true,
    msg: "Ping successful",
    random: num,
    calculation: calc,
    time: new Date()
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);

/* ---------------- CRON JOB ---------------- */

// runs every 2 minutes
cron.schedule("*/2 * * * *", async () => {
  try {
    const url = process.env.RENDER_URL || "http://localhost:5000";

    const res = await fetch(`${url}/ping`);
    const data = await res.json();

    console.log("⏰ Self ping:", data.calculation);
  } catch (err) {
    console.log("Ping failed:", err.message);
  }
});

/* ---------------- Server ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
