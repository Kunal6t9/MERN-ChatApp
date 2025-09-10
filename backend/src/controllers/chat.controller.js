import Chat from "../models/chat.model.js";

// Create new chat (1-to-1 or Group)
export const createChat = async (req, res) => {
  try {
    const { participants, name, isGroup } = req.body;

    if (!participants || participants.length < 2) {
      return res.status(400).json({ message: "At least 2 participants are required" });
    }

    // Check if a 1-to-1 chat already exists
    if (!isGroup) {
      const existingChat = await Chat.findOne({
        isGroup: false,
        participants: {
          $size: 2,
          $all: participants,
        },
      }).populate("participants", "fullName email");
      
      if (existingChat) {
        return res.status(200).json(existingChat); // Return existing chat if found
      }
    }

    const chatData = {
      participants,
      isGroup: isGroup || false,
      name: isGroup ? name : undefined,
    };

    const newChat = new Chat(chatData);
    await newChat.save();

    const populatedChat = await Chat.findById(newChat._id).populate(
      "participants",
      "fullName email"
    );

    res.status(201).json(populatedChat);
  } catch (error) {
    console.error("Create Chat Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get all chats 
export const getUserChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: { $in: [req.user._id] },
    })
      .populate("participants", "fullName email")
      .populate("lastMessage");

    res.status(200).json(chats);
  } catch (error) {
    console.error("Get User Chats Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single chat by ID
export const getChatById = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId).populate("participants", "fullName email").populate("lastMessage");

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error("Get Chat By ID Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add user to group chat
export const addToGroup = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userId } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: { participants: userId } },
      { new: true }
    ).populate("participants", "fullName email");

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(updatedChat);
  } catch (error) {
    console.error("Add to Group Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove user from group chat
export const removeFromGroup = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userId } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { participants: userId } },
      { new: true }
    ).populate("participants", "fullName email");

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(updatedChat);
  } catch (error) {
    console.error("Remove From Group Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};