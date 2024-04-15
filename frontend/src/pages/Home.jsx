import React, { useEffect } from "react";
import StudentTable from "../components/studentTable";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [token, setToken] = useState(null);
  console.log(token);
  let navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/login");
    } else {
      setToken(JSON.stringify(localStorage.getItem("token")));
    }
  }, []);

  const Logout = async ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("teacher")
    await navigate("/login")
    alert("attempting to logout")
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Student Information</h1>
      <div>
        <Button onClick={Logout}>Logout</Button>
        <StudentTable />
        <Link to={"/student_form"}>
          <Button variant="outlined" fullWidth sx={{ m: 1 }}>
            Insert New
          </Button>
        </Link>
      </div>
    </div>
  );
}
