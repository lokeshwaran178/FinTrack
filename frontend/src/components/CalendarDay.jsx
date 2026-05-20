import React from "react";
import "./CalendarDay.css";

// type: 'empty' | 'future' | 'green' | 'red'
const CalendarDay = ({ day, type, total }) => {
  if (type === "empty") {
    return <div className="cal-day cal-day--empty" />;
  }

  return (
    <div
      className={`cal-day cal-day--${type}`}
      title={total !== undefined ? `₹${total}` : ""}
    >
      {day}
    </div>
  );
};

export default CalendarDay;
