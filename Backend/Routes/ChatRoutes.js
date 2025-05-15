import express from 'express';
import {createChat,getallchat,addconversation,getconverstion,deletechat} from '../Controllers/ChatContollers.js';
import isAuth from '../Middlewares/IsAuth.js';
const router=express.Router();

router.post('/create',isAuth,createChat)
router.get('/getallchat',isAuth,getallchat)
router.post('/add/:id',isAuth,addconversation)
router.get('/getchat/:id',isAuth,getconverstion)
router.delete('/delete/:id',isAuth,deletechat)

export default router;