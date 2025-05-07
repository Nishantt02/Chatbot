import express from 'express';
import {Loginuser, Profile, verifyUser} from '../Controllers/UserControllers.js';
import isAuth from '../Middlewares/IsAuth.js';
const router=express.Router();

router.post('/login',Loginuser)
router.post('/verify',verifyUser)
router.post('/me',isAuth,Profile)

export default router;