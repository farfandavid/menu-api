import express from 'express';
import userController from '../controllers/userController.js';
import { userValidationRules } from '../validators/userValidator.js';
import { validate } from '../validators/validate.js';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userValidationRules(), validate, userController.registerUser);
router.post('/login', userController.loginUser);

// Add other user-related routes here

export default router;