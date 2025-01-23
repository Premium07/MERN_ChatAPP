import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", isAuthenticated, updateProfile);

export default router;
