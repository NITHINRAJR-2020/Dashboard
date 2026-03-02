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
    <div className="layout">
      
      
      <div className="sidebar">
        <h2 className="logo">🏥 MedCare</h2>

        <ul className="menu">
          <li>Dashboard</li>
          <li>Patients</li>
          <li>Doctors</li>
          <li>Appointments</li>
          <li>Admissions</li>
          <li>Billing</li>
          <li>Pharmacy</li>
          <li>Laboratory</li>
          <li>Reports</li>
        </ul>
      </div>
      {/* User Info Card */}
      <div className="main-content">
        {/* Header */}
      <div className="dashboard-header">
        <h2>Welcome, {data.name || data.user?.name}</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
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

    </div>
  );
};

export default Dashboard;