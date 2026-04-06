import express from 'express';
import { createUser, loginUser, logoutUser, getUser, getUserByToken } from '../../controllers/user.js';
import { isLoggedIn } from '../../middlewares/user.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);  
router.post('/logout', isLoggedIn, logoutUser);
router.get('/me', isLoggedIn, getUserByToken); // Endpoint to get user info based on token
router.get('/:id', isLoggedIn, getUser);

export default router;