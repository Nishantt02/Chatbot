import mongoose from "mongoose";
const ConversationSchema=new mongoose.Schema({


    chat:{
        type:mongoose.Schema.Types.ObjectId,
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