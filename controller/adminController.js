import Users from "../models/userModel.js";
import bcrypt from "bcrypt";

// get all users
const getAllUsers = async (req, res) => {
  const users = await Users.find({}).select("-password");
  res.status(200).json({message: "userDetials", users});
};

// add new users
const addNewUser = async (req, res) => {
  const {fullName, email, phone, password, confirmPassword, isAdmin} = req.body;
  try {
    const existingUser = await Users.findOne({email: email});
    if (existingUser) {
      return res.status(400).json({message: "existing user"});
    }
    if (password !== confirmPassword) {
      return res.status(400).json({message: "Password dose't match!"});
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const users = new Users({
      fullName: fullName,
      email: email,
      password: hashPassword,
      phone: phone,
      isAdmin,
      image: req.file ? req.file.path : null,
    });
    const userData = await users.save();
    return res
      .status(200)
      .json({message: "User register successfully", user: userData});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Not able to register new user!"});
  }
};

//getUserById

const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({message: "user dose not exist"});
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({message: "something went wrong user not found"});
  }
};

//update user
const updateUserDetails = async (req, res) => {
  const {fullName, email, designation, phone, company, state, place, zipCode} =
    req.body;
  try {
    const user = await Users.findById(req.params.id);
    console.log("frm the updaeUerDetails", user);
    if (!user) {
      return res.status(404).json({message: "user not found"});
    }
    (user.fullName = fullName || user.fullName),
      (user.email = email || user.email),
      (user.designation = designation || user.designation),
      (user.phone = phone || user.phone),
      (user.company = company || user.company),
      (user.state = state || user.state),
      (user.place = place || user.place),
      (user.zipCode = zipCode || user.zipCode);
    if (req.file) {
      user.image = req.file.path;
    }
    const updatedData = await user.save();
    return res
      .status(200)
      .json({message: "user updated successfully", user: updateUserDetails});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({message: "something went wrong not able to update"});
  }
};

// block and unblock user
const blockAndUnblock = async (req, res) => {
  const userId = req.params.id;
  
  try {
    const user = await Users.findById(userId);
    console.log("from blockunblock", user)
    if (!user) {
      return res.status(404).json({message: "user not found"});
    }
    user.isBlock = !user.isBlock
    await user.save()
    return res.status(200).json({message : `User ${user.isBlock ? "Blocked" : "Unblocked"} successfully`})
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({message: "Failed to toggle block status", error});
  }
};

//delete user
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try{
        const user = await Users.findByIdAndDelete(userId)
        if(!user){
            return res.status(404).json({message: "user not found"})
        }
        return res.status(200).json({message: "user deleted successfully"})
    }catch(error){
        console.log(error)
        return res.status(500).json({message: "failed to delete user", error})
    }
}

//search user details
const searchUser = async (req, res) => {
  const {query} = req.query;
  try{
    const user = await Users.find({
      $or:[
        {fullName: {$regex: query, $options: "i"}},
        {email: {$regex: query, $options: "i"}}
      ]
    })
    if(!user){
      return res.status(404).json({message: "user not found"})
    }
    return res.status(200).json(user)
  }catch(error){
    console.log(error)
    return res.status(500).json({message: "search failed"})
  }
  
}

export {getAllUsers, addNewUser, getUserById, updateUserDetails, blockAndUnblock, deleteUser, searchUser};
