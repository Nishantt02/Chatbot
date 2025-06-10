  import jwt from "jsonwebtoken";
  import User from "../Models/User.js";

const isAuth = async (req, res, next) => {
  try {
    // access the token from headers
    // it can be in the form of Bearer token or just token
    const token = req.headers.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(400)
        .json({ message: "provide the token ", success: false });
    }
    // verify the token using jwt.verify
    // it will decode the token and return the user id

    const decode = jwt.verify(token, process.env.JWT_KEY);
    if (!decode) {
      return res.status(400).json({ message: "Invalid Token", success: false });
    }
// it will find the user by its _id
    req.user = await User.findById(decode._id);
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

// This middleware is used to check if the user is authenticated
export  default isAuth;


