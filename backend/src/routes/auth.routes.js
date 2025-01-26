import express from "express";
import {
  checkAuth,
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
// router.get("/profile", isAuthenticated, getProfile);
router.get('/check', isAuthenticated, checkAuth)

export default router;
