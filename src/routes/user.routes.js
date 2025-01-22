import express from "express";
import {
  loginUser,
  logoutUser,
  register,
} from "../controllers/users.controllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
