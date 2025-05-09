import mongoose from "mongoose";

const ChatSchema =new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
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