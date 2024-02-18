import express from 'express';
import cors from 'cors'; // Add this line
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import menuRoutes from './routes/menuRoutes.js';

const PORT = process.env.PORT | 4000;
const app = express();
const CORS = {
  origin: 'http://localhost:4321',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(CORS)); // Add this line
app.use(express.json());
// Connect to MongoDB
connectDB();

app.use('/user', userRoutes);
app.use('/menus', menuRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));