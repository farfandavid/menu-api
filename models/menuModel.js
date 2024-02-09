import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String
});

const categorySchema = new mongoose.Schema({
  name: String,
  products: [productSchema]
});
// Define the schema
const menuSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  contact: {
    email: String,
    phone: String,
    web: String
  },
  categorys: [categorySchema],
  config: {
    color: String
  }
});



export default mongoose.model('Menu', menuSchema);