import mongoose from "mongoose";

const ChatSchema =new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,  // store the user id in the chat
        // this is used to create a relationship between the user and the chat
        ref:'User', // this is used to reference the User model
        required:true
    },
    latestMessage:{
        type:String,
        required:true,
        default:"New Chat"
    }

},
{
    timestamps:true // this is used to create createdAt and updatedAt fields
})
const Chat=mongoose.model('Chat',ChatSchema)
export default Chat