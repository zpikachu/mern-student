const teacherSchema = require("../Models/Teacher");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const SECRETE_KEY = "STUDENTS";

const Register = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const profile = req.file?.filename;
    let checkEmail = await teacherSchema.findOne({ email: email });
    if (checkEmail) {
      console.log("Email already exists!");
      res.json({ message: "Email already exists!" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let newTeacher = await new teacherSchema({
        name,
        phone,
        email,
        password: hashedPassword,
        profile,
      });
      let savedTeacher = await newTeacher.save();
      console.log("New teacher registered successfully");
      res.json({
        success: true,
        message: "New teacher registered successfully",
        teacher: savedTeacher,
      });
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await teacherSchema.findOne({ email: email });
    if (!user) {
      console.log("Email not found!");
      res.json({ message: "Email or Password Invalid!" });
    } else {
      let checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        console.log("Invalid Password!");
        res.json({ message: "Email or Password Invalid!" });
      } else {
        let userId = user.id;
        
        let token = await jsonwebtoken.sign(userId, SECRETE_KEY);
        console.log("Login successful!");
        res.json({
          message: "Login successful!",
          success: true,
          loggedInUser: user,
          authToken: token,
        });
      }
    }
  } catch (err) {
    console.log("Error occurred" + err);
    res.json({ error: err });
  }
};

module.exports = { Register, Login };
