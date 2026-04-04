import express from 'express';
import { createUser, loginUser, logoutUser, getUser, getUserByToken } from '../../controllers/user.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);  
router.post('/logout', logoutUser);
router.get('/me', getUserByToken); // Endpoint to get user info based on token
router.get('/:id', getUser);

export default router;

