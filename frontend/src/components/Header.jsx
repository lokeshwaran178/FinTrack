import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-inner">
        {/* Left: Hamburger + Logo */}
        <div className="header-left">
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`ham-line ${menuOpen ? "open" : ""}`} />
            <span className={`ham-line ${menuOpen ? "open" : ""}`} />
            <span className={`ham-line ${menuOpen ? "open" : ""}`} />
          </button>
          <div className="header-logo">💰 FinTrack</div>
        </div>

        {/* Desktop nav — hidden on mobile */}
        <nav className="header-nav desktop-nav">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "nav-link nav-active" : "nav-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/streak"
            className={({ isActive }) =>
              isActive ? "nav-link nav-active" : "nav-link"
            }
          >
            Streak
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              isActive ? "nav-link nav-active" : "nav-link"
            }
          >
            Leaderboard
          </NavLink>
          <NavLink
            to="/account"
            className={({ isActive }) =>
              isActive ? "nav-link nav-active" : "nav-link"
            }
          >
            Account
          </NavLink>
        </nav>

        {/* Right: username + logout */}
        <div className="header-right">
          <span className="header-username">
            Hi, {user?.name?.split(" ")[0] || ""}
          </span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "mobile-link active" : "mobile-link"
          }
          onClick={closeMenu}
        >
          🏠 Home
        </NavLink>
        <NavLink
          to="/streak"
          className={({ isActive }) =>
            isActive ? "mobile-link active" : "mobile-link"
          }
          onClick={closeMenu}
        >
          🔥 Streak
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) =>
            isActive ? "mobile-link active" : "mobile-link"
          }
          onClick={closeMenu}
        >
          🏆 Leaderboard
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive }) =>
            isActive ? "mobile-link active" : "mobile-link"
          }
          onClick={closeMenu}
        >
          👤 Account
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
