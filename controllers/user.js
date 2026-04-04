import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/server.js';

async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    // Logic to create a user in the database

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword, role: 'user' });
    await newUser.save();

    const {password: _, ...userWithoutPassword} = newUser.toObject();
    
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create user' });
  }
}


async function getUser(req, res) {
  try {
    const userId = req.params.id;
    // Logic to retrieve a user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const {password: _, ...userWithoutPassword} = user.toObject();
    
    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve user' });
  }
}

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



    return res.cookie('token', token, {secure: true, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 }).status(200).json({ message: 'Login successful' });
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

async function getUserByToken(req, res) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = jwt.verify(token, JWT_SECRET_KEY);
    const userData = await User.findById(user.userId);
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    const {password: _, ...userWithoutPassword} = userData.toObject();
    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
} 

export { createUser, getUser, loginUser, logoutUser, getUserByToken };