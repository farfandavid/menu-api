import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import menuRoutes from './routes/menuRoutes.js';

const PORT = 4000;
const app = express();

app.use(express.json());
// Connect to MongoDB
connectDB();

app.use('/users', userRoutes);
app.use('/menus', menuRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
