import mongoose from "mongoose";

const connectDB = () => {
    const uri = "mongodb://localhost:27017/ums"
    return mongoose.connect(uri)
    .then(() => {
        console.log("database connected successfully")
    })
    .catch((error) => {
        console.error("connection failed", error)
    })
}

export default connectDB;