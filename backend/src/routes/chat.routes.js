import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  getMessages,
  getUsers,
  sendMessages,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/users", isAuthenticated, getUsers);
router.get("/:id", isAuthenticated, getMessages);
router.post("/send/:id", isAuthenticated, sendMessages);

export default router;
