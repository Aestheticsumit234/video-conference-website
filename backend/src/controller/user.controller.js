import { User } from "../models/user.models.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import crypto from "crypto";

const register = async (req, res) => {
  const { name, email, password, username } = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      username,
    });

    res.status(httpStatus.CREATED).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};


const login = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if(!user){
      return res.status(httpStatus.NOT_FOUND).json({message:"User not found"});
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
   
    if(isPasswordMatch){
        let token = crypto.randomBytes(32).toString("hex");
        user.token = token;
        await user.save();
        res.status(httpStatus.OK).json({message:"User logged in successfully", loggedInUser:{
            name:user.name,
            email:user.email,
            username:user.username
        }});
    }

    if(!isPasswordMatch){
      return res.status(httpStatus.UNAUTHORIZED).json({message:"Invalid credentials"});
    }
  } catch (error) {
    console.log(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export { register, login };
