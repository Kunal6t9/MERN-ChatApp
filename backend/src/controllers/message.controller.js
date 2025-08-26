// src/controllers/message.controller.js
import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import { io, getReceiverSocketId } from "../lib/socket.js";

// @desc Get users for sidebar
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUserId } })
      .select("-password")
      .select("fullName email"); // Standardized to fullName
    res.json(users);
  } catch (error) {
    console.error("Error fetching users for sidebar:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Send a new message
export const sendMessage = async (req, res) => {
  try {
    const { chatId, content } = req.body;
    const senderId = req.user._id;

    if (!chatId || !content) {
      return res.status(400).json({ message: "Chat ID and content are required" });
    }

    // Determine if the content is an image URL or text
    const isImageUrl = content.startsWith("http") && (content.endsWith(".jpg") || content.endsWith(".png") || content.endsWith(".gif"));

    const newMessageData = {
      sender: senderId,
      chat: chatId,
      messageType: isImageUrl ? "image" : "text",
    };

    if (isImageUrl) {
      newMessageData.image = content;
    } else {
      newMessageData.text = content;
    }

    const newMessage = new Message(newMessageData);
    let message = await newMessage.save();

    // Populate sender and chat information
    message = await message.populate("sender", "fullName email profilePic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.participants",
      select: "fullName email profilePic",
    });

    // Update the chat's lastMessage
    await Chat.findByIdAndUpdate(chatId, { lastMessage: message });

    // Emit the message to all participants in the chat
    const chat = message.chat;
    if (chat && chat.participants) {
      chat.participants.forEach((participant) => {
        const receiverSocketId = getReceiverSocketId(participant._id.toString());
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", message);
        }
      });
    }

    res.status(201).json(message);
  } catch (error) {
    console.error("Error in sendMessage:", error.message);
    res.status(500).json({ message: "Failed to send message", error: error.message });
  }
};

// @desc Get all messages in a chat
export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "fullName email") // Standardized to fullName
      .populate({
        path: "chat",
        populate: {
          path: "participants",
          select: "fullName email",
        },
      });

    res.json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error.message);
    res.status(500).json({ message: "Failed to get messages", error: error.message });
  }
};

// @desc Mark messages as read
export const markAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user._id;

    await Message.updateMany(
      { chat: chatId, readBy: { $ne: userId } },
      { $push: { readBy: userId } }
    );
    res.json({ message: "Messages marked as read" });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    res.status(500).json({ message: "Server error" });
  }
};