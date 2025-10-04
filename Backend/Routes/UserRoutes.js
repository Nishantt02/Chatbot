import express from 'express';
import {Loginuser, Profile, verifyUser} from '../Controllers/UserControllers.js';
import isAuth from '../Middlewares/IsAuth.js';
const router=express.Router();

 router.post('/login',Loginuser)


// router.post("/User/login", async (req, res) => {
//   const { email } = req.body;
//   const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

//   try {
//     await sendMail(email, "Your OTP Code", otp);
//     res.json({ success: true, message: "OTP sent successfully!" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Email failed", error });
//   }
// });

router.post('/verify',verifyUser)
router.get('/me',isAuth,Profile)

export default router;  