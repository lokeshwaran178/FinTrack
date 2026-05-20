import React from "react";
import "./CategoryGrid.css";

const CATEGORIES = [
  { key: "food", label: "Food", icon: "🍜" },
  { key: "shopping", label: "Shopping", icon: "🛍️" },
  { key: "clothes", label: "Clothes", icon: "👕" },
  { key: "travel", label: "Travel", icon: "🚌" },
  { key: "entertainment", label: "Entertainment", icon: "🎮" },
  { key: "health", label: "Health", icon: "💊" },
  { key: "utilities", label: "Utilities", icon: "⚡" },
  { key: "other", label: "Other", icon: "📦" },
];

const CategoryGrid = ({ selected, onSelect }) => {
  return (
    <div className="mb-3">
      <p className="section-label mb-2">Select Category</p>
      <div className="row g-2">
        {CATEGORIES.map((cat) => (
          <div className="col-6 col-sm-3" key={cat.key}>
            <div
              className={`cat-btn ${selected === cat.key ? "cat-btn--active" : ""}`}
              onClick={() => onSelect(cat.key)}
            >
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-label">{cat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
export { CATEGORIES };
