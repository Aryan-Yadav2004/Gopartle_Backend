import express from "express";
import { getAllUsers, getUser } from "../../../controllers/user.js";

const adminUserRouter = express.Router();

adminUserRouter.get('/', getAllUsers);

adminUserRouter.get('/:id', getUser);

export default adminUserRouter;