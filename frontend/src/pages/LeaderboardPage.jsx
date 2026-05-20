import React, { useState, useEffect } from "react";
import LeaderboardList from "../components/LeaderboardList";
import api from "../utils/api";

const LeaderboardPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get("/leaderboard");
        setData(res.data.leaderboard);
      } catch (err) {
        setError("Failed to load leaderboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="page-container">
      <h2 style={{ color: "var(--dark)", marginBottom: "0.3rem" }}>
        Leaderboard
      </h2>
      <p
        style={{
          color: "var(--text-light)",
          fontSize: "0.85rem",
          marginBottom: "1.5rem",
        }}
      >
        Ranked by streak count — stay under budget every day to climb up!
      </p>

      {loading && <p style={{ color: "var(--text-light)" }}>Loading...</p>}
      {error && <div className="error-msg">{error}</div>}
      {!loading && !error && <LeaderboardList data={data} />}
    </div>
  );
};

export default LeaderboardPage;
