import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { 
  getMessages, 
  getUsersForSidebar, 
  sendMessage, 
  markAsRead 
} from "../controllers/message.controller.js";

const router = express.Router();

// Get all users for sidebar
router.get("/users", protectRoute, getUsersForSidebar);

// Get all messages of a chat
router.get("/:chatId", protectRoute, getMessages);

// Send a new message
router.post("/send/:id", protectRoute, sendMessage);

// Mark messages as read
router.put("/mark-as-read/:chatId", protectRoute, markAsRead);

export default router;
