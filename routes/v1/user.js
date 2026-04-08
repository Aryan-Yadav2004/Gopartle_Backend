import express from 'express';
import { createUser, getUser, getUserByToken } from '../../controllers/user.js';
import { isLoggedIn } from '../../middlewares/user.js';

const router = express.Router();

router.post('/register', createUser);//done!
router.get('/me', isLoggedIn, getUserByToken); //done!

export default router;