import express from 'express';
import {createChat,getallchat,addconversation} from '../Controllers/ChatContollers.js';
import isAuth from '../Middlewares/IsAuth.js';
const router=express.Router();

router.post('/create',isAuth,createChat)
router.get('/getallchat',isAuth,getallchat)
router.post('/:id',isAuth,addconversation)

export default router;