import express from "express";
import { loginUser, logoutUser } from "../../controllers/auth.js";
import { isLoggedIn } from "../../middlewares/user.js";

const authRouter = express.Router();

authRouter.post('/login', loginUser);  //done!
authRouter.get('/logout', isLoggedIn, logoutUser);//done!


export default authRouter;