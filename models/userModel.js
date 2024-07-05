import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    designation:{
        type: String,
        required: false,
    },
    company:{
        type: String,
        required: false,
    },
    phone:{
        type: Number,
        required: false,
    },
    state:{
        type: String,
        required: false,
    },
    place:{
        type: String,
        required: false,
    },
    zipCode:{
        type: Number,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    isBlock: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true
});

const Users = mongoose.model("Users", userSchema);

export default Users;
