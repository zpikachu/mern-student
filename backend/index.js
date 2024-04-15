const express = require("express");
const ConnectToMongo = require("./db");
const cors = require("cors");
ConnectToMongo();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/student", require("./Routes/student_routes"));
app.use("/api/teacher", require("./Routes/teacher_routes"));
app.use("/uploads/student", express.static("./uploads"));
app.use("/uploads/teacher", express.static("./uploads/teacher"));

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
