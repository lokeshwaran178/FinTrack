import React from "react";
import CalendarDay from "./CalendarDay";
import "./CalendarGrid.css";

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarGrid = ({ calendar, month, year }) => {
  // Find what weekday the 1st falls on (0=Sun, 6=Sat)
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date().getDate();

  // Build a lookup from calendar data returned by API
  // calendar = [{ day, total, passed }]
  const calMap = {};
  calendar.forEach((c) => {
    calMap[c.day] = c;
  });

  // Build cell array: empty slots + actual days
  const cells = [];

  // Empty slots before the 1st
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push({ type: "empty", key: `empty-${i}` });
  }

  // Actual days
  for (let d = 1; d <= daysInMonth; d++) {
    const entry = calMap[d];
    let type = "future";

    if (entry) {
      // Day has data from API — green or red
      type = entry.passed ? "green" : "red";
    }
    // Days after today with no data stay 'future'

    cells.push({ type, day: d, total: entry?.total, key: `day-${d}` });
  }

  const monthName = new Date(year, month - 1, 1).toLocaleString("default", {
    month: "long",
  });

  return (
    <div className="card calendar-card">
      <p className="section-label mb-3">
        {monthName} {year}
      </p>

      {/* Day name headers */}
      <div className="cal-grid">
        {DAY_HEADERS.map((d) => (
          <div key={d} className="cal-header">
            {d}
          </div>
        ))}

        {/* Day cells */}
        {cells.map((cell) => (
          <CalendarDay
            key={cell.key}
            day={cell.day}
            type={cell.type}
            total={cell.total}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="d-flex gap-3 mt-3">
        <div className="d-flex align-items-center gap-1">
          <div className="legend-dot legend-dot--green" />
          <span className="legend-text">Under budget</span>
        </div>
        <div className="d-flex align-items-center gap-1">
          <div className="legend-dot legend-dot--red" />
          <span className="legend-text">Over budget</span>
        </div>
        <div className="d-flex align-items-center gap-1">
          <div className="legend-dot legend-dot--future" />
          <span className="legend-text">Future</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid;
