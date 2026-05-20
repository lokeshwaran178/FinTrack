const express = require("express");
const Expense = require("../models/Expense");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

// GET /api/streak
// Returns current streak count + monthly calendar data (day-by-day pass/fail)
router.get("/", async (req, res) => {
  try {
    const user = req.user;

    // Get current month's start and end
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

    // Fetch all expenses for this month
    const monthlyExpenses = await Expense.find({
      user_id: user._id,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    // Group expenses by day, sum per day
    const dailyTotals = {};
    monthlyExpenses.forEach((exp) => {
      const day = new Date(exp.date).getDate(); // 1-31
      dailyTotals[day] = (dailyTotals[day] || 0) + exp.expense;
    });

    // Build calendar: for each past day, mark green (under budget) or red (over budget)
    const today = now.getDate();
    const calendar = [];

    for (let day = 1; day <= today; day++) {
      const total = dailyTotals[day] || 0;
      const passed = total <= user.daily_budget;
      calendar.push({ day, total, passed });
    }

    res.status(200).json({
      streak: user.streak,
      daily_budget: user.daily_budget,
      calendar,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch streak.", error: err.message });
  }
});

module.exports = router;
