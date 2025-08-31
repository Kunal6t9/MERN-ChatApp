import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utilis.js";

// Signup 
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // The generateToken function should handle setting the cookie
    generateToken(user._id, res);

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

// Login 
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Logout 
export const logout = (req, res) => {
  res.clearCookie("jwt", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
  res.json({ message: "User logged out successfully" });
};

// Checkauth 
export const checkAuth = (req, res) => {
  try {
    res.status(200).json({
      _id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      profilePic: req.user.profilePic,
    });
  } catch (error) {
    console.error("CheckAuth Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { fullName, profilePic } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (fullName) user.fullName = fullName;
    if (profilePic) user.profilePic = profilePic;

    await user.save();

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};