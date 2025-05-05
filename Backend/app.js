import express from 'express';
import router from './Routes/UserRoutes.js';
 const app = express();

 app.use(express.json());

 app.use('/User',router)
 export default app;