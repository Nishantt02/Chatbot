import express from 'express';
import router from './Routes/UserRoutes';
 const app = express();
 app.use(express.json());

 app.use('/User',router)
 export default app;