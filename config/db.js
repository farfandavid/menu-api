import mongoose from 'mongoose';
import "dotenv/config.js";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
};

export default connectDB;