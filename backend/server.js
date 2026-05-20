require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { startCronJobs } = require("./config/cron");

const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expenses");
const streakRoutes = require("./routes/streak.js");
const accountRoutes = require("./routes/account");

const app = express();

// ─── Middleware ───────────────────────────────────────────────
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "https://your-app.vercel.app"],
    credentials: true,
  }),
);
app.use(express.json()); // Parse JSON bodies — essential for POST/PUT

// ─── Routes ──────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/streak", streakRoutes);
app.use("/api", accountRoutes); // Handles /api/leaderboard and /api/account

// ─── Health check ─────────────────────────────────────────────
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// ─── Global error handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error." });
});

// ─── DB + Server startup ──────────────────────────────────────
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected.");
    startCronJobs(); // Start cron after DB is ready
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
