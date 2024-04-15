const mongoose = require("mongoose");
const { Schema } = mongoose;
const studentSchema = new Schema({
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher",
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    profile: {
        type: String,
    },
});
module.exports = mongoose.model("student", studentSchema);