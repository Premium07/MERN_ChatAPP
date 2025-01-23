import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { getUsers } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/users", isAuthenticated, getUsers);

export default router;
