import express from 'express';
import userRouter from './user.js';
import eventRouter from './event.js';

const v1Router = express.Router();
v1Router.use('/users', userRouter);
v1Router.use('/events', eventRouter);

export default v1Router;