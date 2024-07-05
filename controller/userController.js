import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";


//verify User
const verifyUser = async (req, res) => {
  try{
    const userId = req.user;
    const userData = await Users.findById(userId.id)
    if(!userData){
      return res.status(401).json({message: "User not found"})
    }
    return res.status(200).json({message: "User verifed", user: userData})
  }catch(error){
    console.log(error)
    return res.status(401).json({message: "Fail to verifyUse", error})
  }
}

// registerUser
const registerUser = async (req, res) => {
  const {fullName, email, password, cpassword, isAdmin} = req.body;
  try {
    const existingUser = await Users.findOne({email: email});
    if (existingUser) {
      return res.status(400).json({message: "user already exist"});
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const users = new Users({
      fullName: fullName,
      email: email,
      password: hashPassword,
      isAdmin,
    });
    const userData = await users.save();
    res
      .status(200)
      .json({message: "User created successfully", user: userData});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "failed to register the user", error});
  }
};

// authUser
const authUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const userData = await Users.findOne({email: email});
        if(!userData){
            return res.status(404).json({message: "user not found"})
        }
        // if(userData.isBlock){
        //   return res.status(404).json({message: "Account is blocked by Admin"})
        // }
        const matchPassword = await bcrypt.compare(password, userData.password);
        if(!matchPassword){
            return res.status(400).json({message: "Invalid password"})
        }
        generateToken(res, userData)
        return res.status(200).json({message: "Login successfull", user: userData})
    }catch(error){
        console.error(error);
        return res.status(500).json({message: "failed to login", error})
    }
};

//getUser
const getUser = async (req, res) => {
    try{
        const userId = req.user;
        const userData = await Users.findById(userId.id).select("-password")
        if(!userData){
            return res.status(404).json({message: "user not found"})
        }
        console.log("frm getUser", userData)
        return res.status(200).json({message: "success", user: userData});
    }catch(error){
        console.error(error)
        res.status(500).json({message: "Failed to fetch the user"})
    }
  
};

//updateUser
const updateUser = async (req, res) => {
  const userId = req.user;
  const {fullName, email, designation, phone, company, state, place, zipCode} = req.body;
  try{
    const user = await Users.findById(userId.id)
    if(!user){
      return res.status(400).json({message: 'User not found'})
    }
    user.fullName = fullName||user.fullName,
    user.email = email||user.email,
    user.designation = designation||user.designation,
    user.phone = phone||user.phone,
    user.company = company||user.company,
    user.state = state||user.state,
    user.place = place||user.place,
    user.zipCode = zipCode||user.zipCode
    if(req.file){
      user.image = req.file.path
    }
    const updateUser = await user.save()
    return res.status(200).json({message: "User updated successfully", user: updateUser})
  }catch(error){ 
    console.log(error)
    return res.status(500).json({message: "Failed to update the user details", error})
  }
  // res.status(200).json({message: "update user"});
};

//logout
const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({message: "user logout"});
};


// for admin controllers

// const getAllUsers = async (req, res) => {
//   const users = await Users.find({}).select("-password")
//   res.status(200).json({message: "userDetials", users})
// }

export {registerUser, authUser, getUser, updateUser, logoutUser, verifyUser};
