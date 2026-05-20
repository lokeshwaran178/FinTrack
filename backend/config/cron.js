const cron = require("node-cron");
const User = require("../models/User");

/**
 * CRON JOB — runs at 00:00 (midnight) every day
 *
 * Logic per user:
 * 1. Compare daily_expense vs daily_budget
 * 2. If daily_expense <= daily_budget → increment streak by 1
 * 3. If daily_expense > daily_budget  → reset streak to 0
 * 4. Reset daily_expense to 0 for the new day
 *
 * Why $inc and $set separately? Atomic updates prevent race conditions
 * if the server receives expense writes near midnight.
 */
const startCronJobs = () => {
  // Schedule: second=0, minute=0, hour=0 → midnight every day
  cron.schedule("0 0 * * *", async () => {
    console.log(`[CRON] Midnight job started: ${new Date().toISOString()}`);

    try {
      const users = await User.find({});
      console.log(`[CRON] Processing ${users.length} users...`);

      const results = await Promise.allSettled(
        users.map(async (user) => {
          const underBudget = user.daily_expense <= user.daily_budget;

          await User.findByIdAndUpdate(user._id, {
            // If under budget: increment streak. If over: reset to 0.
            streak: underBudget ? user.streak + 1 : 0,
            daily_expense: 0, // Reset for new day
          });

          return {
            userId: user._id,
            underBudget,
            newStreak: underBudget ? user.streak + 1 : 0,
          };
        }),
      );

      const succeeded = results.filter((r) => r.status === "fulfilled").length;
      const failed = results.filter((r) => r.status === "rejected").length;
      console.log(`[CRON] Done. Success: ${succeeded}, Failed: ${failed}`);
    } catch (err) {
      console.error("[CRON] Job failed:", err.message);
    }
  });

  console.log("[CRON] Midnight streak evaluator scheduled.");
};

module.exports = { startCronJobs };
