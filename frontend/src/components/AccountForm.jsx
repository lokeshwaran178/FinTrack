import React, { useState } from "react";

const AccountForm = ({ user, onSave, loading }) => {
  const [form, setForm] = useState({
    name: user?.name || "",
    daily_budget: user?.daily_budget || "",
    monthly_income: user?.monthly_income || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name: form.name,
      daily_budget: Number(form.daily_budget),
      monthly_income: Number(form.monthly_income),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
        />
      </div>

      <div className="row g-3">
        <div className="col-12 col-sm-6">
          <div className="form-group">
            <label>Daily Budget (₹)</label>
            <input
              type="number"
              name="daily_budget"
              value={form.daily_budget}
              onChange={handleChange}
              placeholder="500"
            />
          </div>
        </div>

        <div className="col-12 col-sm-6">
          <div className="form-group">
            <label>Monthly Income (₹)</label>
            <input
              type="number"
              name="monthly_income"
              value={form.monthly_income}
              onChange={handleChange}
              placeholder="25000"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={loading}
        style={{
          borderRadius: "10px",
          padding: "0.65rem 1.8rem",
          marginTop: "0.5rem",
        }}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default AccountForm;
