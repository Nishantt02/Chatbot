import express from 'express';
import Loginuser from '../Controllers/UserControllers.js';
const router=express.Router();

router.post('/login',Loginuser)

export default router;