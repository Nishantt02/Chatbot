import mongoose from "mongoose";
const ConversationSchema=new mongoose.Schema({


    chat:{
        type:mongoose.Schema.Types.ObjectId, // get the chat id from the chat model
        // this is used to create a relationship between the chat and the conversation
        ref:'Chat',
        required:true
    },
    question:{
        
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
})
const conversation=mongoose.model('Conversation',ConversationSchema)
export default conversation