import express from 'express';
import userRouter from './user.js';
import eventRouter from './event.js';
import { isAdmin, isLoggedIn } from '../../middlewares/user.js';
import adminRouter from './admin/index.js';
import authRouter from './auth.js';

const v1Router = express.Router();

v1Router.use('/users', userRouter);
v1Router.use('/events', isLoggedIn, eventRouter);
v1Router.use('/admin', isLoggedIn, isAdmin, adminRouter);
v1Router.use('/auth', authRouter);

export default v1Router;