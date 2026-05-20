import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import "./AuthPage.css";

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    daily_budget: "",
    monthly_income: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!form.name || !form.email || !form.password) {
      setError("Name, email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        daily_budget: Number(form.daily_budget) || 500,
        monthly_income: Number(form.monthly_income) || 0,
      });

      // Save token + user in context and localStorage
      login(res.data.user, res.data.token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">💰 FinTrack</div>
        <h2 className="auth-title">Create Account</h2>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Lokesh R"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Min 6 characters"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="auth-row">
            <div className="form-group">
              <label>Daily Budget (₹)</label>
              <input
                type="number"
                name="daily_budget"
                placeholder="500"
                value={form.daily_budget}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Monthly Income (₹)</label>
              <input
                type="number"
                name="monthly_income"
                placeholder="25000"
                value={form.monthly_income}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            className="btn-primary auth-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
