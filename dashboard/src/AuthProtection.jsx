import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthProtection = ({children}) => {
  const [valid, setValid] = useState(false);
  const [load, setLoad] = useState(true);
  const [data,setData] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/");
      return;
    }

    fetch("http://localhost:7000/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        setValid(true);
        setData(data);

      })
      .catch(() => {
        localStorage.removeItem("access_token");
        navigate("/");
      })
      .finally(() => setLoad(false));

  }, [navigate]);

  if (load) {
    return <div>Loading...</div>;
  }
  if (!valid){
    return null;
  }
  return React.cloneElement(children,{user:data});
}

export default AuthProtection;