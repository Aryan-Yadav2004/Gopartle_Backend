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



async function getUserByToken(req, res) {
  try {
    const token = req.cookies?.token;

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


async function getAllUsers(req, res) {
  try {

    const limit = 10;
    
    const page  = req.params.page || 1;

    const skip = (page - 1) * 10;

    const users = await User.find().limit(limit).skip(skip);
    return res.status(200).json(users);

  } catch (error) {

    return res.status(500).json({ error: 'Failed to fetch events' });
  }

};

export { createUser, getUser, getUserByToken, getAllUsers };