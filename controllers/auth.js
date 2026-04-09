import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { JWT_SECRET_KEY, TOKEN_AGE } from '../config/server.js';

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    // Logic to authenticate a user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const secretKey = JWT_SECRET_KEY;
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, { expiresIn: '168h' });



    return res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: TOKEN_AGE }).status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to login user' });
  }
}

async function logoutUser(req, res) {
  try {

    return res.clearCookie('token', { secure: true, sameSite: 'strict' }).status(200).json({ message: 'Logged out successfully' });

  } catch (error) {

    return res.status(500).json({ error: 'Failed to logout user' });

  }
}

export { loginUser, logoutUser };