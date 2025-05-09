import Chat from "../Models/Chat.js";
import Conversation from "../Models/Conversation.js";


// this is used to create a chat for the login user 
const createChat = async (req, res) => {
  try {
    const userId = req.user._id;

    const chat = await Chat.create({
      user: userId,
    });

    res.status(200).json({
      message: "Chat Created Successfully",
      success: true,
      chat,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// to get all the chats of the user
const getallchat = async (req, res) => {
  try {
    // this is used to get all the chats of the user and sort them in descending order
    // of createdAt field and populate the user field with email field of user model
    const chats = await Chat.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("user", "email"); // populate user field with email
    res.status(200).json({
      message: "All Chats",
      chats,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// this is used to add a conversation to the chat
// and update the latest message of the chat
const addconversation = async (req,res) => {
  try {
    const chatId = req.params.id.trim(); // ✅ Trim to avoid ObjectId errors

    const chat = await Chat.findById(chatId).populate('user', 'email');
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const { question, answer } = req.body;

    // ✅ Validate required fields
    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer are required" });
    }

    // ✅ Create the conversation
    const conversation = await Conversation.create({
      chat: chat._id,
      question,
      answer
    });

    // ✅ Update the latest message on the chat
    chat.latestMessage = question;
    const updatedChat = await chat.save();

    res.status(200).json({
      message: "Conversation added successfully",
      success: true,
      chat: updatedChat,
      conversation: conversation
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createChat, getallchat,addconversation };
