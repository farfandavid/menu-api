import mongoose from 'mongoose';

const menusUsers = new mongoose.Schema({
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    unique: true
  }
});

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  email: String,
  menusUsers: [menusUsers]
});

export default mongoose.model('User', userSchema);