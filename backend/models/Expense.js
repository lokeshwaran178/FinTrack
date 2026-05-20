const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Index for faster user-specific queries
    },
    expense: {
      type: Number,
      required: [true, "Expense amount is required"],
      min: [0, "Expense cannot be negative"],
    },
    expense_label: {
      type: String,
      required: [true, "Label is required"],
      enum: [
        "food",
        "shopping",
        "clothes",
        "travel",
        "entertainment",
        "health",
        "utilities",
        "other",
      ],
      default: "other",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Compound index for efficient daily expense queries per user
expenseSchema.index({ user_id: 1, date: 1 });

module.exports = mongoose.model("Expense", expenseSchema);
