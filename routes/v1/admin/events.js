import express from "express";
import { getAllEvents } from "../../../controllers/event.js";

const adminEventRouter = express.Router();

adminEventRouter.get('/', getAllEvents);

export default adminEventRouter;