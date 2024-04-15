const mongoose = require("mongoose");
// const ConnectURI = "mongodb://127.0.0.1:27017/mern_student";
const ConnectURI = "mongodb://localhost:27017/mern_student";
const ConnectToMongo = async() => {
    try {
        await mongoose.connect(ConnectURI);
        console.log("Connect To Mongo Successful");
    } catch (err) {
        console.log("Connect To Mongo Unsuccessful", err);
    }
};
module.exports = ConnectToMongo;