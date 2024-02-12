import { body } from 'express-validator';

export const userValidationRules = () => {
  return [
    body('username').isString().isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isString().isLength({ min: 8, max: 20 }).withMessage('Password must be between 8 and 20 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/).withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one digit')
  ];
}