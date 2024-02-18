import express from 'express';
import userController from '../controllers/userController.js';
import { userValidationRules, passwordResetValidationRules } from '../validators/userValidator.js';
import { validate } from '../validators/validate.js';
import checkAuth from '../auth/auth.js';

const router = express.Router();

router.get('/', userController.getAllUsers);
//Get a user by id
router.get('/:id', checkAuth, userController.getUserById);
//Register a new user
router.post('/', userValidationRules(), validate, userController.registerUser);
//Login a user
router.post('/login', userController.loginUser);
//Update a user
router.put('/update/:id', checkAuth, userValidationRules(), validate, userController.updateUser);
//Delete a user
router.delete('/delete/:id', checkAuth, userController.deleteUser);
//Reset password
router.post('/reset-password', checkAuth, passwordResetValidationRules(), validate, userController.resetPassword);
// Add other user-related routes here

export default router;