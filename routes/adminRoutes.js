import express from 'express';
import { isAuth, isAuthAdmin } from '../middleware/isAuth.js';
import upload from '../utils/multerConfig.js';
import { addNewUser, blockAndUnblock, deleteUser, getAllUsers, getUserById, updateUserDetails } from '../controller/adminController.js';

const adminRoute = express.Router()

adminRoute.get("/getUsers", isAuth, isAuthAdmin, getAllUsers);
adminRoute.post("/addUser", isAuth, isAuthAdmin, upload.single('image'), addNewUser)
adminRoute.get("/userById/:id", isAuth, isAuthAdmin, getUserById)
adminRoute.put("/user-update/:id", isAuth, isAuthAdmin, upload.single('image'), updateUserDetails)
adminRoute.delete("/delete/:id", isAuth, isAuthAdmin, deleteUser),
adminRoute.get("/searchUser", )

export default adminRoute;