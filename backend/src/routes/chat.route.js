import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { 
  createChat, 
  getUserChats, 
  getChatById, 
  addToGroup, 
  removeFromGroup 
} from "../controllers/chat.controller.js";

const router = express.Router();

// Create new chat (1v1 or group)
router.post("/", protectRoute, createChat);

// Get all chats for logged-in user
router.get("/", protectRoute, getUserChats);

// Get a single chat by ID
router.get("/:chatId", protectRoute, getChatById);

// Add user to group chat
router.put("/:chatId/add", protectRoute, addToGroup);

// Remove user from group chat
router.put("/:chatId/remove", protectRoute, removeFromGroup);

export default router;
