import User from '../models/userModel.js';
import mongoose from 'mongoose';

const getAllUsers = async (req, res) => {
  const users = await User.aggregate([
    {
      $lookup: {
        from: 'menus',
        localField: 'menusUser.menu',
        foreignField: '_id',
        as: 'menusUser'
      }
    }
  ]);
  res.status(200).json(users);
};

// Create a new user
/**
example request body: 
{
  "username": "username",
  "password": "password",
  "email": "example@example.com",
  "menusUser":[]
}
 */
const createUser = async (req, res) => {
  console.log(req.is('application/json'));
  // Check if the request body is in JSON format
  if (!req.is('application/json')) return res.status(400).json({ message: 'Bad request' });
  // Create a new user
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    menusUser: req.body.menusUser
  });
  // Save the user to the database
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export default { getAllUsers, createUser };