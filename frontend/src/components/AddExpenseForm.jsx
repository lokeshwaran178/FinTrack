import React, { useState } from "react";

const AddExpenseForm = ({ selectedCategory, onAdd, loading }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) return;
    onAdd(val);
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <p className="section-label mb-2">Enter Amount</p>
      <div className="d-flex gap-2">
        <input
          type="number"
          placeholder="₹ 0"
          value={amount}
          min="1"
          onChange={(e) => setAmount(e.target.value)}
          style={{ borderRadius: "10px", flex: 1 }}
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={loading || !amount}
          style={{
            borderRadius: "10px",
            whiteSpace: "nowrap",
            padding: "0.55rem 1.4rem",
          }}
        >
          {loading ? "Adding..." : "+ Add"}
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm;
