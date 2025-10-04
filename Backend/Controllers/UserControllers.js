
import User from "../Models/User.js";
import SendMail from "../Middlewares/SendMail.js";
import Jwt from "jsonwebtoken";
import sendMail from "../Middlewares/SendMail.js";

// SendMail("chauhannishant0206@gmail.com", "Test Email", "123456")
//   .then(() => console.log("Email sent successfully"))
//   .catch(err => console.error("Email send failed:", err));


const Loginuser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

    // Generate token with OTP
    const VerifyToken = Jwt.sign(
      { otp, userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    // Send email using Resend
    await sendMail(email, "OTP Verification", otp);

    res.json({
      message: "OTP sent successfully",
      VerifyToken,
      success: true,
    });
  } catch (error) {
    console.error("Login error:", error);
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

    if (decoded.otp.toString().trim() !== otp.toString().trim()) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }

    // ✅ Create real login token (this will be used in headers for all APIs)
    const token = Jwt.sign(
      { _id: decoded.userId },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    res.json({
      message: "User login successful",
      success: true,
      token, // send this token
      user: { _id: decoded.userId, email: decoded.email }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};


const Profile=async(req,res)=>{
  try {
    // it is used to find the user by its id 
    const user=await User.findById(req.user._id)
    res.json({message:"User profile",success:true,user})
        console.log("req.user from isAuth middleware:", req.user);

  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
}

export { Loginuser ,verifyUser,Profile};
