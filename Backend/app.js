import express from 'express';
import router from './Routes/UserRoutes.js';
import Chatroutes from './Routes/ChatRoutes.js';

 const app = express();
 import cors from 'cors';

 app.use(express.json());
 app.use(cors())

 app.use('/User',router)
 app.use('/Chat',Chatroutes)
 export default app;