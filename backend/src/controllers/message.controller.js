import Message from "../models/message.model.js";
import User from "../models/user.model.js";

//Send message
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;

    const newMessage = await Message.create({
      senderId: req.user._id,
      receiverId,
      message,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Send message failed", error: error.message });
  }
};

//Get messages with user
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: req.user._id, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: req.user._id },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Fetch messages failed", error: error.message });
  }
};

//Get all users (for sidebar)
export const getUsersForSidebar = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};
