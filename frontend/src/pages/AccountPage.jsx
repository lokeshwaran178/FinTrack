import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import AccountForm from "../components/AccountForm";
import StatsGrid from "../components/StatsGrid";
import "./AccountPage.css";

const AccountPage = () => {
  const { user, updateUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // First letter of each word in name for avatar
  const initials = user?.name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSave = async (formData) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await api.put("/account", formData);

      // Update context + localStorage with new values
      updateUser(res.data.user);
      setSuccess("Account updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title mb-1">Account</h2>
      <p className="page-sub mb-4">Manage your profile and budget settings</p>

      {/* Stats row */}
      <StatsGrid
        streak={user?.streak || 0}
        dailyExpense={user?.daily_expense || 0}
        dailyBudget={user?.daily_budget || 0}
        monthlyIncome={user?.monthly_income || 0}
      />

      {/* Profile card */}
      <div className="card account-card">
        {/* Avatar + email */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="account-avatar">{initials}</div>
          <div>
            <p
              className="mb-0"
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--dark)",
              }}
            >
              {user?.name}
            </p>
            <p
              className="mb-0"
              style={{ fontSize: "0.82rem", color: "var(--text-light)" }}
            >
              {user?.email}
            </p>
          </div>
        </div>

        <hr style={{ borderColor: "var(--border)", marginBottom: "1.2rem" }} />

        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}

        <AccountForm user={user} onSave={handleSave} loading={loading} />
      </div>
    </div>
  );
};

export default AccountPage;
