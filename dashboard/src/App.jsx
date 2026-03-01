import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage";
import Dashboard from "./Dash";
function App() {
  return (
    <Router>
      <Routes>
        {/* Login / Signup Page */}
        <Route path="/" element={<AuthPage />} />
        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
              <Dashboard />
          }
        />
      </Routes>
    </Router>
  );
}
export default App;

