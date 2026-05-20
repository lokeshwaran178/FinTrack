import React from "react";
import "./LeaderboardItem.css";

// Medal emoji for top 3
const getMedal = (rank) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
};

const LeaderboardItem = ({ rank, name, streak, isCurrentUser, maxStreak }) => {
  const barWidth = maxStreak > 0 ? (streak / maxStreak) * 100 : 0;

  return (
    <div className={`lb-item ${isCurrentUser ? "lb-item--you" : ""}`}>
      {/* Rank */}
      <div className="lb-rank">{getMedal(rank)}</div>

      {/* Name */}
      <div className="lb-name">
        {name}
        {isCurrentUser && <span className="you-tag">You</span>}
      </div>

      {/* Streak bar */}
      <div className="lb-bar-wrap">
        <div className="lb-bar-track">
          <div className="lb-bar-fill" style={{ width: `${barWidth}%` }} />
        </div>
      </div>

      {/* Streak count */}
      <div className="lb-streak">{streak} 🔥</div>
    </div>
  );
};

export default LeaderboardItem;
