import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { PORT } from './config/server.js';
import { connectDB } from './config/db.js';
import apiRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();


app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

  

