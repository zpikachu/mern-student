import * as React from "react";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [studentInfo, setStudentInfo] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  let navigate = useNavigate();
  const handleChange = (event) => {
    setStudentInfo({ ...studentInfo, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setStudentProfile(event.target.files[0]);
  };

  console.log(studentInfo);
  console.log(studentProfile);
  const handleInsert = () => {
    let token=JSON.parse(localStorage.getItem("token"))
    const data = new FormData();
    data.append("fname", studentInfo.fname);
    data.append("femail", studentInfo.femail);
    data.append("fphone", studentInfo.fphone);
    data.append("faddress", studentInfo.faddress);
    data.append("fprofile", studentProfile);
    axios
      .post("http://localhost:7000/api/student/insertStudent", data, {headers:{ "auth-token": token }})
      .then(async (response) => {
        console.log(response);
        await navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleChange}
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleChange}
                  required
                  fullWidth
                  id="fphone"
                  label="Phone"
                  name="fphone"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="femail"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  required
                  fullWidth
                  name="faddress"
                  label="Address"
                  type="text"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleFileChange}
                  required
                  fullWidth
                  name="fprofile"
                  label="Profile Picture"
                  type="file"
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleInsert}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              Insert
            </Button>
            <Link to={"/"}>
              <Button
                type="submit"
                fullWidth
                color="secondary"
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                View Details
              </Button>
            </Link>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
