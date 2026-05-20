import React from "react";
import LeaderboardItem from "./LeaderboardItem";

const LeaderboardList = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
        No data yet.
      </p>
    );
  }

  // Used to calculate bar widths relative to the top user
  const maxStreak = data[0]?.streak || 1;

  return (
    <div>
      {data.map((item) => (
        <LeaderboardItem
          key={item.rank}
          rank={item.rank}
          name={item.name}
          streak={item.streak}
          isCurrentUser={item.isCurrentUser}
          maxStreak={maxStreak}
        />
      ))}
    </div>
  );
};

export default LeaderboardList;
