import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Auth pages (no header/footer)
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Protected pages (with header/footer)
import LeaderboardPage from "./pages/LeaderboardPage";
import HomePage from "./pages/HomePage";
import StreakPage from "./pages/StreakPage";
import AccountPage from "./pages/AccountPage";

import "./index.css";

// Layout wrapper for protected pages — includes Header and Footer
const AppLayout = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <Header />
    <main style={{ flex: 1 }}>{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />

          {/* Auth routes — no header */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes — with header + footer */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <HomePage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <LeaderboardPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/streak"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <StreakPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <AccountPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Uncomment as pages are built */}
          {/* <Route path="/home" element={<ProtectedRoute><AppLayout><HomePage /></AppLayout></ProtectedRoute>} /> */}
          {/* <Route path="/streak" element={<ProtectedRoute><AppLayout><StreakPage /></AppLayout></ProtectedRoute>} /> */}
          {/* <Route path="/account" element={<ProtectedRoute><AppLayout><AccountPage /></AppLayout></ProtectedRoute>} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
