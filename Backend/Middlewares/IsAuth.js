  import jwt from "jsonwebtoken";
  import User from "../Models/User.js";



const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(400)
        .json({ message: "provide the token ", success: false });
    }

    const decode = jwt.verify(token, process.env.JWT_KEY);
    if (!decode) {
      return res.status(400).json({ message: "Invalid Token", success: false });
    }

    req.user = await User.findById(decode._id);
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};


export  default isAuth;


