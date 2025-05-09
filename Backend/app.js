import express from 'express';
import router from './Routes/UserRoutes.js';
import Chatroutes from './Routes/ChatRoutes.js';
 const app = express();

 app.use(express.json());

 app.use('/User',router)
 app.use('/Chat',Chatroutes)
 export default app;