import React from "react";
import "./StreakBadge.css";

const StreakBadge = ({ streak, dailyBudget }) => {
  return (
    <div className="streak-badge-wrap d-flex align-items-center gap-4 mb-4">
      {/* Streak count */}
      <div className="streak-badge">
        <div className="streak-num">{streak}</div>
        <div className="streak-label">🔥 Day Streak</div>
      </div>

      {/* Info text */}
      <div>
        <p
          className="mb-1"
          style={{ fontWeight: 600, color: "var(--dark)", fontSize: "0.95rem" }}
        >
          Keep it going!
        </p>
        <p
          className="mb-0"
          style={{ fontSize: "0.83rem", color: "var(--text-light)" }}
        >
          Stay under <strong>₹{dailyBudget}</strong> every day to grow your
          streak.
        </p>
        <p
          className="mb-0 mt-1"
          style={{ fontSize: "0.83rem", color: "var(--text-light)" }}
        >
          Streak resets automatically at midnight if you go over budget.
        </p>
      </div>
    </div>
  );
};

export default StreakBadge;
