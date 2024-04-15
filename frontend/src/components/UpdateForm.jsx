import * as React from "react";
import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp({ selectedStudent, setSelectedStudent }) {
  const [studentProfile, setStudentProfile] = useState(null);
  //   useEffect(() => {
  //     setUpdatedStudent(selectedStudent);
  //   });
  let navigate = useNavigate();
  const handleChange = (event) => {
    setSelectedStudent({
      ...selectedStudent,
      [event.target.name]: event.target.value,
    });
  };
  const handleFileChange = (event) => {
    setStudentProfile(event.target.files[0]);
  };
  // console.log(selectedStudent);

  const handleSubmit = (event) => {
    const data = new FormData();
    data.append("name", selectedStudent.name);
    data.append("email", selectedStudent.email);
    data.append("phone", selectedStudent.phone);
    data.append("address", selectedStudent.address);
    data.append("profile", studentProfile);
    axios
      .put(
        `http://localhost:7000/api/student/updateUser/${selectedStudent?._id}`,
        data
      )
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
      <Container component="main" maxWidth="sm">
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
                  value={selectedStudent?.name}
                  onChange={handleChange}
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name of the student"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={selectedStudent?.phone}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="phone"
                  label="Contact Number"
                  name="phone"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={selectedStudent?.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={selectedStudent?.address}
                  onChange={handleChange}
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="text"
                  id="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleFileChange}
                  required
                  fullWidth
                  name="profile"
                  label="Address"
                  type="file"
                  id="address"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  value={selectedStudent?.Class}
                  onChange={handleChange}
                  required
                  fullWidth
                  label="Class"
                  name="Class"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={selectedStudent?.division}
                  onChange={handleChange}
                  required
                  fullWidth
                  name="division"
                  label="Division"
                  type="text"
                />
              </Grid> */}
            </Grid>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Update
            </Button>
            <Link to={"/"}>
              <Button
                fullWidth
                color="secondary"
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                View Students
              </Button>
            </Link>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
