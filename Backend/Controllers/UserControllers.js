// import User from "../Models/User.js";
// import SendMail from "../Middlewares/SendMail.js";
// import Jwt from "jsonwebtoken";

// const Loginuser =async(req,res)=>{
//  try {
    
//     const{email}=req.body
//     const user=await User.findOne({email})

//     if(!user){
//         user=await User.create({email})
//     }
//     const otp=Math.floor( 100000+Math.random()*1000000)
//     // geneate the token 
//     const VerifyToken=await Jwt.sign({otp,user},process.env.JWT_SECRET,{expiresIn:"5m"})
//     await SendMail(email,"OTP Verification",otp)
//     res.json({
//         message:"OTP sent to your email",
//         VerifyToken,
//         success:true,
//     })



//  } catch (error) {
    
//     res.status(500).json({message:error.message})
//  }
// }

// export default Loginuser


import User from "../Models/User.js";
import SendMail from "../Middlewares/SendMail.js";
import Jwt from "jsonwebtoken";

const Loginuser = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Always 6-digit OTP

    // Only store minimal data in token
    const VerifyToken = await Jwt.sign(
      { otp, userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    await SendMail(email, "OTP Verification", otp);

    res.json({
      message: "OTP sent to your email",
      VerifyToken,
      success: true,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default Loginuser;
