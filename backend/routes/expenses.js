const express = require("express");
const Expense = require("../models/Expense");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

// All expense routes are protected
router.use(protect);

// POST /api/expenses/add
router.post("/add", async (req, res) => {
  try {
    const { expense, expense_label } = req.body;

    if (!expense || expense <= 0) {
      return res
        .status(400)
        .json({ message: "Valid expense amount required." });
    }

    // Create expense record
    const newExpense = await Expense.create({
      user_id: req.user._id,
      expense,
      expense_label: expense_label || "other",
    });

    // Atomically increment user's daily_expense
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { daily_expense: expense } },
      { new: true },
    );

    res.status(201).json({
      message: "Expense added.",
      expense: newExpense,
      daily_expense: updatedUser.daily_expense,
      daily_budget: updatedUser.daily_budget,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add expense.", error: err.message });
  }
});

// GET /api/expenses/today
router.get("/today", async (req, res) => {
  try {
    // Build today's date range (midnight to midnight in local time)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const expenses = await Expense.find({
      user_id: req.user._id,
      date: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ date: -1 });

    // Aggregate total
    const total = expenses.reduce((sum, e) => sum + e.expense, 0);

    res.status(200).json({
      expenses,
      total,
      daily_budget: req.user.daily_budget,
      daily_expense: req.user.daily_expense,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch expenses.", error: err.message });
  }
});

module.exports = router;
