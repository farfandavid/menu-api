import User from '../models/userModel.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const getAllUsers = async (req, res) => {
  const users = await User.aggregate([
    {
      $addFields: { _id: { $toString: '$_id' } }
    },
    {
      $lookup: {
        as: 'menus',
        from: 'menus',
        foreignField: 'id_user',
        localField: '_id'
      }
    }
  ]);
  res.status(200).json(users);
};

/*
Register a new user
example request body: 
{
  "username": "username",
  "password": "password",
  "email": "example@example.com",
  "menusUser":[]
}
*/
const registerUser = async (req, res) => {
  if (!req.is('application/json')) return res.status(400).json({ message: 'Bad request' });
  const { username, password, email } = req.body;
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    password,
    email
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Login a user
const loginUser = async (req, res) => {
  if (!req.is('application/json')) return res.status(400).json({ message: 'Bad request' });
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
/*
Create a new user
example request body: 
{
  "username": "username",
  "password": "password",
  "email": "example@example.com",
  "menusUser":[]
}
*/
/* const createUser = async (req, res) => {
  // Check if the request body is in JSON format
  if (!req.is('application/json')) return res.status(400).json({ message: 'Bad request' });
  // Create a new user
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });
  // Save the user to the database
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
} */

export default { getAllUsers, registerUser, loginUser };