import jwt from "jsonwebtoken";
import User from "../Models/User.js";

const isAuth = async (req, res, next) => {
  try {
    console.log("Headers received:", req.headers); // 👈 Add this line
    const token = req.headers.token;
    console.log("Token received:", token);

    if (!token) {
      return res
        .status(400)
        .json({ message: "provide the token ", success: false });
    }
    const decode = jwt.verify(token, process.env.JWT_KEY);
    if (!decode) {
      return res.status(400).json({ message: "Invalid Token", success: false });
    }
    console.log("Decoded token:", decode);


    req.user=await User.findById(decode._id)
    next()

  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export  default isAuth;