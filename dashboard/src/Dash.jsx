import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    fetch("http://localhost:7000/dashboard",{
        headers: {
        Authorization: `Bearer ${token}`
      }
    })
     .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
    .then(data => setData(data))
    .catch(() => {
        localStorage.removeItem("access_token");
        window.location.href = "/";
      });
}, []);
return (
    <div>
      <h1>Dashboard</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default Dashboard;