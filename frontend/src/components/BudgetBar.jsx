import React from "react";

const BudgetBar = ({ dailyExpense, dailyBudget }) => {
  const pct =
    dailyBudget > 0 ? Math.min((dailyExpense / dailyBudget) * 100, 100) : 0;
  const over = dailyExpense > dailyBudget;

  return (
    <div className="card budget-card mb-4">
      <div className="d-flex justify-content-between align-items-flex-end mb-2">
        <div>
          <p className="budget-label mb-1">Today's Spend</p>
          <h2 className={`budget-amount mb-0 ${over ? "text-danger" : ""}`}>
            ₹{dailyExpense.toFixed(0)}
          </h2>
        </div>
        <div className="text-end">
          <p className="budget-label mb-1">Daily Budget</p>
          <h5
            className="mb-0"
            style={{ color: "var(--dark)", fontWeight: 700 }}
          >
            ₹{dailyBudget}
          </h5>
        </div>
      </div>

      {/* Bootstrap progress bar */}
      <div
        className="progress"
        style={{ height: "10px", borderRadius: "999px" }}
      >
        <div
          className={`progress-bar ${over ? "bg-danger" : ""}`}
          style={{
            width: `${pct}%`,
            borderRadius: "999px",
            background: over
              ? ""
              : "linear-gradient(90deg, var(--dark), var(--mid))",
            transition: "width 0.5s ease",
          }}
        />
      </div>

      {over && (
        <p
          className="mt-2 mb-0"
          style={{
            color: "var(--danger)",
            fontSize: "0.82rem",
            fontWeight: 600,
          }}
        >
          ⚠ Over budget by ₹{(dailyExpense - dailyBudget).toFixed(0)}
        </p>
      )}

      {!over && (
        <p
          className="mt-2 mb-0"
          style={{
            color: "var(--success)",
            fontSize: "0.82rem",
            fontWeight: 600,
          }}
        >
          ✓ ₹{(dailyBudget - dailyExpense).toFixed(0)} remaining
        </p>
      )}
    </div>
  );
};

export default BudgetBar;
