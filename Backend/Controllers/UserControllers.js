import User from "../Models/User";
import SendMail from "../Middlewares/SendMail.js";
import { JsonWebTokenError } from "jsonwebtoken";
import mongoose from "mongoose";

const Loginuser =async(req,res)=>{
 try {
    
    const{email}=req.body
    const user=await User.findOne({email})
    if(!user){
        user=await User.create({email})
    }
    const otp=Math.floor( 100000+Math.random()*1000000)
    const VerifyToken=await Jwt.sign({otp,user},process.env.JWT_SECRET,{expiresIn:"5m"})
    await SendMail(email,"OTP Verification",otp)
    res.json({
        message:"OTP sent to your email",
        VerifyToken,
        success:true,
    })



 } catch (error) {
    
    res.status(500).json({message:error.message})
 }
}

export default Loginuser