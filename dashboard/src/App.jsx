import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage";
import Dashboard from "./Dash";
import AuthProtection from "./AuthProtection";
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
            <div>
              <AuthProtection>
              <Dashboard/>
              </AuthProtection>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;

