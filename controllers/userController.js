import User from '../models/userModel.js';

const getAllUsers = async (req, res) => {
  const users = await User.aggregate([
    {
      $lookup: {
        from: 'menus',
        localField: 'menusUsers.menu',
        foreignField: '_id',
        as: 'menusUsers'
      }
    }
  ]);
  res.status(200).json(users);
};

export default { getAllUsers };

// Add other user-related controller methods here