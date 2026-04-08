import express from "express";
import adminEventRouter from "./events.js";
import adminUserRouter from "./users.js";
import adminDashboardRouter from "./dashboard.js";

const adminRouter = express.Router();

adminRouter.use('/events', adminEventRouter);
adminRouter.use('/users', adminUserRouter);
adminRouter.use('/dashboard', adminDashboardRouter);

export default adminRouter;