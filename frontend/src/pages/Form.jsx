import React from "react";
import InsertForm2 from "../components/InsertForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Form() {
  const [token, setToken] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/login");
    } else {
      setToken(JSON.stringify(localStorage.getItem("token")));
    }
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Insert new Student</h1>
      <InsertForm2 />
    </div>
  );
}
