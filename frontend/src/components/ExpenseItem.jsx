import React from "react";
import { CATEGORIES } from "./CategoryGrid";
import "./ExpenseItem.css";

// Build a lookup map from the CATEGORIES array
const CAT_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));

const ExpenseItem = ({ expense_label, expense, date }) => {
  const cat = CAT_MAP[expense_label] || { icon: "📦", label: expense_label };
  const time = new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="expense-item d-flex align-items-center gap-3">
      <div className="expense-icon">{cat.icon}</div>
      <div className="flex-grow-1">
        <p className="expense-label mb-0">{cat.label}</p>
        <p className="expense-time mb-0">{time}</p>
      </div>
      <div className="expense-amount">-₹{expense}</div>
    </div>
  );
};

export default ExpenseItem;
