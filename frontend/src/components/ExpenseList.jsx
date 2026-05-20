import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="text-center py-4" style={{ color: "var(--text-light)" }}>
        <div style={{ fontSize: "2rem" }}>🎉</div>
        <p className="mt-2 mb-0" style={{ fontSize: "0.9rem" }}>
          No expenses yet today!
        </p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-2">
      {expenses.map((exp) => (
        <ExpenseItem
          key={exp._id}
          expense_label={exp.expense_label}
          expense={exp.expense}
          date={exp.date}
        />
      ))}
    </div>
  );
};

export default ExpenseList;
