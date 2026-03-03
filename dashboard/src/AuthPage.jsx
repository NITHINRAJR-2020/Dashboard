import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    role: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin
      ? "http://localhost:7000/login"
      : "http://localhost:7000/signup";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Something went wrong");
        return;
      }

      if (isLogin) {
        localStorage.setItem("access_token", data.access_token);
        navigate("/dashboard");
      } else {
        alert("Signup successful! Please login.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-brand-icon">M</div>
          <span className="auth-brand-name">My App</span>
        </div>

        {/* Heading */}
        <div className="auth-heading">
          <h2>{isLogin ? "Welcome back" : "Create account"}</h2>
          <p>{isLogin ? "Sign in to your account to continue" : "Fill in the details below to get started"}</p>
        </div>

        {/* Tab toggle */}
        <div className="auth-tabs">
          <button
            className={"auth-tab" + (isLogin ? " active" : "")}
            onClick={() => setIsLogin(true)}
            type="button"
          >
            Login
          </button>
          <button
            className={"auth-tab" + (!isLogin ? " active" : "")}
            onClick={() => setIsLogin(false)}
            type="button"
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} key={isLogin ? "login" : "signup"}>

          {!isLogin && (
            <>
              <div className="auth-field">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-row">
                <div className="auth-field">
                  <label>Gender</label>
                  <select name="gender" onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="auth-field">
                  <label>Role</label>
                  <select name="role" onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="receptionist">Receptionist</option>
                    <option value="patient">Patient</option>
                  </select>
                </div>
              </div>

              <div className="auth-divider"><span>credentials</span></div>
            </>
          )}

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-submit">
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="switch-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default AuthPage;