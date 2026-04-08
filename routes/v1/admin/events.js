import express from "express";
import { getAllEvents, getEventsById } from "../../../controllers/event.js";

const adminEventRouter = express.Router();

adminEventRouter.get('/', getAllEvents);//done

adminEventRouter.get('/:id', getEventsById);//done

export default adminEventRouter;