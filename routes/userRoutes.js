import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', userController.getAllUsers);

// Add other user-related routes here

export default router;