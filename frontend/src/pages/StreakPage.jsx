import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import StreakBadge from "../components/StreakBadge";
import CalendarGrid from "../components/CalendarGrid";

const StreakPage = () => {
  const { user } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const res = await api.get("/streak");
        setData(res.data);
      } catch (err) {
        setError("Failed to load streak data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStreak();
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-title mb-1">Streak Calendar</h2>
      <p className="page-sub mb-4">Track your daily budget discipline</p>

      {loading && <p style={{ color: "var(--text-light)" }}>Loading...</p>}
      {error && <div className="error-msg">{error}</div>}

      {data && (
        <>
          <StreakBadge streak={data.streak} dailyBudget={data.daily_budget} />
          <CalendarGrid
            calendar={data.calendar}
            month={data.month}
            year={data.year}
          />
        </>
      )}
    </div>
  );
};

export default StreakPage;
