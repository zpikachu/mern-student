import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SingleView from "./SingleView";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
  borderRadius: "25px",
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));



export default function CustomizedTables() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [count, setCount] = useState(false);
  useEffect(() => {
    let token=JSON.parse(localStorage.getItem("token"))
    axios
      .get("http://localhost:7000/api/student/getAllUsers",{headers:{"auth-token":token},})
      .then((response) => {
        console.log(response.data);
        setStudents(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [count]);
  console.log(students);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (student) => {
    setOpen(true);
    console.log(student);
    setSelectedStudent(student);
  };
  const handleClose = () => setOpen(false);
  const [openViewSingle, setOpenViewSingle] = React.useState(false);
  const handleOpenViewSingle = (student) => {
    setOpenViewSingle(true);
    setSelectedStudent(student);
  };
  const handleCloseViewSingle = () => setOpenViewSingle(false);

  const handleDelete = () => {
    axios
      .delete(
        "http://localhost:7000/api/student/deleteUser/" + selectedStudent._id
      )
      .then((response) => {
        console.log(response.data);
        setCount(!count);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sl No</StyledTableCell>
            <StyledTableCell align="center">Profile</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
            <StyledTableCell align="center">View</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((row, index) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="right">
                <img
                  src={`http://localhost:7000/uploads/student/${row.profile}`}
                  alt="student Profile"
                  style={{ width: "70px", height: "70px", borderRadius:"50%"}}
                />
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.address}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  onClick={() => handleOpen(row)}
                  variant="outlined"
                  color="error"
                >
                  Delete
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  onClick={() => handleOpenViewSingle(row)}
                  variant="outlined"
                  color="success"
                >
                  View
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Link to={`/update/${row._id}`}>
                  <Button variant="outlined" color="secondary">
                    Update
                  </Button>
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Attempting to delete!
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Are you sure, want to delete?
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Button onClick={handleClose} variant="contained" color="error">
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="contained"
                  color="success"
                >
                  Yes,Delete
                </Button>
              </Box>
            </Box>
          </Modal>
          <Modal
            open={openViewSingle}
            onClose={handleCloseViewSingle}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <SingleView selectedStudent={selectedStudent} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Button
                  onClick={handleCloseViewSingle}
                  variant="outlined"
                  color="error"
                  fullWidth
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Modal>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
