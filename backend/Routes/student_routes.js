const express = require("express");
const multer = require("multer");
const fetchTeacher = require("../Middleware/Teacher");
const router = express.Router();
const {
    InsertStudent,
    getAllUsers,
    updateUser,
    deleteUser,
    viewSingleUser,
} = require("../controllers/student_controller");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });
router.post("/insertStudent", fetchTeacher, upload.single("fprofile"), InsertStudent);
router.get("/getAllUsers", fetchTeacher, getAllUsers);
router.put("/updateUser/:id", upload.single("profile"), updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.get("/viewSingleUser/:id", viewSingleUser);
module.exports = router;