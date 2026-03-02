import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({user}) => {
  const [data, setData] = useState(user);
  const navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("access_token")
    navigate("/")
  }

  return (
    <div className="dashboard-container">
      
      {/* Header */}
      <div className="dashboard-header">
        <h2>Welcome, {data.name || data.user?.name}</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* User Info Card */}
      <div className="card">
        <h3>Profile Information</h3>
        <div className="info-row">
          <span>Email:</span>
          <span>{data.email || data.user?.email}</span>
        </div>
        <div className="info-row">
          <span>Role:</span>
          <span>{data.role || data.user?.role}</span>
        </div>
        <div className="info-row">
          <span>User ID:</span>
          <span>{data.user_id || data.user?.id}</span>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;