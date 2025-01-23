import { models } from "../models/index.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

// generate access token
const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: "6h",
  });
};

// generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "7d",
  });
};

const register = async (req, res) => {
  const { email, password, fullname } = req.body;

  if (!email || !password || !fullname) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await models.User.create({
      email,
      password,
      fullname,
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: "email required" });
  if (!password) return res.status(400).json({ message: "password required" });

  try {
    const user = await models.User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "no user found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "incorrect password" });

    const accessToken = generateAccessToken(user.dataValues);
    const refreshToken = generateRefreshToken(user.dataValues);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Set true in production with HTTPS
      sameSite: "none",
    });

    res.status(200).json({
      message: "user loggedIn successfully",
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// logout user
const logoutUser = async (req, res) => {
  console.log(req.cookie);
  res.clearCookie("refreshToken");
  res.json({ message: "user logout successfully" });
};

export { register, loginUser, logoutUser };
