import mongoose from 'mongoose';

const menusUser = new mongoose.Schema({
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    unique: true
  }
});

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  menusUser: [menusUser]
},
  {
    timestamps: true
  });

export default mongoose.model('User', userSchema);