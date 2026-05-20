const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

// GET /api/leaderboard
// Returns all users sorted by streak descending
router.get("/leaderboard", async (req, res) => {
  try {
    const users = await User.find({})
      .select("name streak") // Only expose name and streak — no sensitive data
      .sort({ streak: -1 })
      .limit(50); // Cap at top 50

    // Attach rank
    const leaderboard = users.map((u, index) => ({
      rank: index + 1,
      name: u.name,
      streak: u.streak,
      isCurrentUser: u._id.toString() === req.user._id.toString(),
    }));

    res.status(200).json({ leaderboard });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch leaderboard.", error: err.message });
  }
});

// GET /api/account
router.get("/account", async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        daily_budget: user.daily_budget,
        monthly_income: user.monthly_income,
        streak: user.streak,
        daily_expense: user.daily_expense,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch account.", error: err.message });
  }
});

// PUT /api/account
router.put("/account", async (req, res) => {
  try {
    const { name, daily_budget, monthly_income } = req.body;

    // Only allow updating safe fields — NOT email, password, streak via this route
    const updates = {};
    if (name) updates.name = name;
    if (daily_budget !== undefined) updates.daily_budget = daily_budget;
    if (monthly_income !== undefined) updates.monthly_income = monthly_income;

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Account updated.",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        daily_budget: updatedUser.daily_budget,
        monthly_income: updatedUser.monthly_income,
        streak: updatedUser.streak,
        daily_expense: updatedUser.daily_expense,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update account.", error: err.message });
  }
});

module.exports = router;
