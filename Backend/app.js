
import express from 'express';
import router from './Routes/UserRoutes.js';
import Chatroutes from './Routes/ChatRoutes.js';
import path from 'path';
import cors from 'cors';

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());

// API routes
app.use('/User', router);
app.use('/Chat', Chatroutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "Frontend/dist")));

// Catch-all for React/Vite frontend routing (Express 5 safe)
app.use((req, res) => {
   res.sendFile(path.join(__dirname, "Frontend/dist/index.html"));
});

export default app;
