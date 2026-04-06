import express from "express";
import adminEventRouter from "./events.js";
import adminUserRouter from "./users.js";

const adminRouter = express.Router();

adminRouter.use('/event', adminEventRouter);
adminRouter.use('/user', adminUserRouter);

export default adminRouter;