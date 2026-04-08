import express from "express";
import { getAdminDashboard } from "../../../controllers/admin.js";
const adminDashboardRouter = express.Router();

adminDashboardRouter.get('/', getAdminDashboard);

export default adminDashboardRouter;
