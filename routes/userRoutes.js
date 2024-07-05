import express from "express";
import { authUser, getUser, logoutUser, registerUser, updateUser, verifyUser } from "../controller/userController.js";
import {isAuth, isAuthAdmin} from "../middleware/isAuth.js";
import upload from "../utils/multerConfig.js"

const userRoute = express.Router()
userRoute.get("/verify", isAuth, verifyUser)

userRoute.post("/register", registerUser)
userRoute.post("/auth", authUser)
userRoute.get("/user-details", isAuth, getUser)
userRoute.put("/update-user", isAuth,  upload.single('image'),updateUser)
userRoute.post("/logout", logoutUser)


// admin routes

// userRoute.get("/getUsers", isAuth, isAuthAdmin, getAllUsers)

export default userRoute;