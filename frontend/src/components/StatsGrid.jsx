import React from "react";
import "./StatsGrid.css";

const StatsGrid = ({ streak, dailyExpense, dailyBudget, monthlyIncome }) => {
  const stats = [
    { label: "Current Streak", value: `${streak} 🔥` },
    { label: "Today's Spend", value: `₹${dailyExpense}` },
    { label: "Daily Budget", value: `₹${dailyBudget}` },
    { label: "Monthly Income", value: `₹${monthlyIncome}` },
  ];

  return (
    <div className="row g-3 mb-4">
      {stats.map((s) => (
        <div className="col-6 col-sm-3" key={s.label}>
          <div className="stat-card">
            <p className="stat-label mb-1">{s.label}</p>
            <p className="stat-value mb-0">{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
