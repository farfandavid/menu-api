import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/* const menusUser = new mongoose.Schema({
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    unique: true
  }
}); */

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
  }/* ,
  menusUser: [menusUser] */
},
  {
    timestamps: true
  });

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
export default mongoose.model('User', userSchema);