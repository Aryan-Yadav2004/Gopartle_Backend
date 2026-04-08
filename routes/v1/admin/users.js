import express from "express";
import { getAllUsers, getUser } from "../../../controllers/user.js";

const adminUserRouter = express.Router();

adminUserRouter.get('/', getAllUsers);//done

adminUserRouter.get('/:id', getUser);//done

export default adminUserRouter;