const studentSchema = require("../Models/student_schema");

const InsertStudent = async(req, res) => {
    try {
        const { fname, femail, fphone, faddress } = req.body;
        const profile = req.file?.filename;
        const newUser = new studentSchema({
            name: fname,
            email: femail,
            phone: fphone,
            address: faddress,
            profile,
            teacher_id:req.teacher
        });
        console.log(newUser);
        let savedUser = await newUser.save();
        console.log("User info inserted successfully");
        res.json({ message: "Insertion successful", newUser: savedUser });
    } catch (err) {
        console.log("Error in insertion" + err);
        res.status(400).json({ error: "Invalid data" });
    }
};

const getAllUsers = async(req, res) => {
    let userData = await studentSchema.find({teacher_id:req.teacher});
    console.log("Users information fetched from database");
    res.json({ message: "All user info fetched from database", users: userData });
};

const updateUser = async(req, res) => {
    let user = await studentSchema.findById(req.params.id);
    if (!user) {
        console.log("User not found with this ID!");
        res.json({ message: "User not found with '" + req.params.id + "' ID!" });
    } else {
        const { name, email, address, phone, Class, division } = req.body;
        const profile = req.file?.filename;
        let updateUser = {};
        if (name) {
            updateUser.name = name;
        }
        if (email) {
            updateUser.email = email;
        }
        if (phone) {
            updateUser.phone = phone;
        }
        if (address) {
            updateUser.address = address;
        }
        if (profile) {
            updateUser.profile = profile;
        }
        user = await studentSchema.findByIdAndUpdate(
            req.params.id, { $set: updateUser }, { new: true }
        );
        console.log("user info updated successfully");
        res.json({ message: "User info updated successfully", data: user });
    }
};
const deleteUser = async(req, res) => {
    let user = await studentSchema.findById(req.params.id);
    if (!user) {
        console.log("User not found with this ID!");
        res.json({ message: "User not found with '" + req.params.id + "' ID!" });
    } else {
        console.log(user);
        await studentSchema.findByIdAndDelete(req.params.id);
        console.log("User info deleted successfully");
        res.json({ message: "user info deleted successfully", deletedUser: user });
    }
};
const viewSingleUser = async(req, res) => {
    let user = await studentSchema.findById(req.params.id);
    if (!user) {
        res.json({ message: "user not found!" });
    } else {
        res.json({ user: user });
    }
};
module.exports = {
    InsertStudent,
    getAllUsers,
    updateUser,
    deleteUser,
    viewSingleUser,
};