import Chat from "../Models/Chat.js";
import mongoose from "mongoose";
import Conversation from "../Models/Conversation.js";


// this is used to create a chat for the login user 
const createChat = async (req, res) => {
  try {
    const userId = req.user._id;

  // create the chat for the user by using the user id 
    const chat = await Chat.create({
      user: userId,
    });

    res.status(200).json({
      message:"Chat Created Successfully",
      success:true,
      chat,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// to get all the chats of the user
const getallchat = async (req,res) => {
  try {
    // this is used to get all the chats of the user and sort them in descending order
    // of createdAt field and populate the user field with email field of user model
    const chats = await Chat.find({ user:req.user._id })
      .sort({ createdAt: -1 })
      // to get the user and email in the chat
      .populate("user", "email");
      
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
    const chatId = req.params.id.trim(); // Trim to avoid ObjectId errors

    // used to find the chat by its id and populate the user field with email
    const chat = await Chat.findById(chatId).populate('user', 'email');
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const { question, answer } = req.body;

    //  Validate required fields
    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer are required" });
    }

    //  Create the conversation
    const conversation = await Conversation.create({
      // chat: chatId,
      chat: new mongoose.Types.ObjectId(chatId),

      question,
      answer
    });

    // ✅ Update the latest message on the chat
    chat.latestMessage = question;
    // const updatedChat = await chat.save();

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { latestMessage: req.body.question },
      { new: true }
    );

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


const getconverstion = async (req, res) => {
  try {
    const chatId = req.params.id.trim();

    // Validate ObjectId
    //  If the chatId is not a valid ObjectId, return a 400 error
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ message: "Invalid Chat ID", success: false });
    }
// To find the conversation by its chat id and populate the chat field
    const conversation = await Conversation.find({
      chat: new mongoose.Types.ObjectId(chatId)
    }).populate('chat');

    // FIX: Return empty array instead of 404
    if (!conversation || conversation.length === 0) {
      return res.status(200).json({
        message: "No conversation found here",
        success: true,
        conversation: [],
      });
    }

    res.status(200).json({
      message: "All Conversations",
      success: true,
      conversation,
    });

  } catch (error) {
    console.error("Error in getconverstion:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};


// this is used to delete the chat
const deletechat = async (req, res) => {
  try {
    const chatId = req.params.id?.trim();

    
    //  Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({ message: "Invalid chat ID" });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "No chat found here to delete" });
    }

    // Check if the logged-in user owns the chat
    if (chat.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "You are not authorized to delete this chat" });
    }

    //  Delete the chat
    await chat.deleteOne();

    res.status(200).json({ message: "Chat deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export { createChat, getallchat,addconversation,getconverstion,deletechat };
