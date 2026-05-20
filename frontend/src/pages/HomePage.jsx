import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import BudgetBar from "../components/BudgetBar";
import CategoryGrid from "../components/CategoryGrid";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import "./HomePage.css";

const HomePage = () => {
  const { user, updateUser } = useAuth();

  const [expenses, setExpenses] = useState([]);
  const [dailyExpense, setDailyExpense] = useState(user?.daily_expense || 0);
  const [selectedCat, setSelectedCat] = useState("food");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch today's expenses on page load
  useEffect(() => {
    const fetchToday = async () => {
      try {
        const res = await api.get("/expenses/today");
        setExpenses(res.data.expenses);
        setDailyExpense(res.data.total);
      } catch (err) {
        setError("Failed to load today's expenses.");
      }
    };
    fetchToday();
  }, []);

  const handleAddExpense = async (amount) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/expenses/add", {
        expense: amount,
        expense_label: selectedCat,
      });

      // Prepend new expense to list
      setExpenses((prev) => [res.data.expense, ...prev]);

      // Update budget bar
      setDailyExpense(res.data.daily_expense);

      // Sync user context so header/account reflects updated daily_expense
      updateUser({ daily_expense: res.data.daily_expense });
    } catch (err) {
      setError("Failed to add expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      {/* Greeting */}
      <div className="mb-4">
        <h2 className="page-title mb-1">Hey, {user?.name?.split(" ")[0]} 👋</h2>
        <p className="page-sub mb-0">{new Date().toDateString()}</p>
      </div>

      {error && <div className="error-msg">{error}</div>}

      {/* Budget progress bar */}
      <BudgetBar
        dailyExpense={dailyExpense}
        dailyBudget={user?.daily_budget || 500}
      />

      {/* Category selector */}
      <div className="card home-card mb-4">
        <CategoryGrid selected={selectedCat} onSelect={setSelectedCat} />
        <AddExpenseForm
          selectedCategory={selectedCat}
          onAdd={handleAddExpense}
          loading={loading}
        />
      </div>

      {/* Today's expense list */}
      <div className="card home-card">
        <p className="section-label mb-3">Today's Expenses</p>
        <ExpenseList expenses={expenses} />
      </div>
    </div>
  );
};

export default HomePage;
