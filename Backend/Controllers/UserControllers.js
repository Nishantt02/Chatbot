
import User from "../Models/User.js";
import SendMail from "../Middlewares/SendMail.js";
import Jwt from "jsonwebtoken";

const Loginuser = async (req, res) => {
  try {
    const { email } = req.body;
    // check if user exists or not
    let user = await User.findOne({ email });
    // if user does not exist, create a new user
    if (!user) {
      user = await User.create({ email });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Always 6-digit OTP

    // this is used to verify otp corrected or not 
    const VerifyToken = await Jwt.sign(
      { otp, userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "50m" }
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


const verifyUser = async (req, res) => {
  try {
    const { otp, VerifyToken } = req.body;

    if (!otp || !VerifyToken) {
      return res.status(400).json({ message: "Please provide all fields", success: false });
    }

    const decoded = Jwt.verify(VerifyToken, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({ message: "Invalid token", success: false });
    }
    
    if (decoded.otp.toString().trim() !== otp.toString().trim()) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }
    
    // generate login token after OTP is verified
    const token = Jwt.sign({ _id: decoded.userId }, process.env.JWT_KEY, { expiresIn: "1d" });

    res.json({ message: "User login successful", success: true, token, user: { _id: decoded.userId, email: decoded.email } });

  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};


const Profile=async(req,res)=>{
  try {
    const user=await User.findById(req.user._id)
    res.json({message:"User profile",success:true,user})
        console.log("req.user from isAuth middleware:", req.user);

  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
}

export { Loginuser ,verifyUser,Profile};
