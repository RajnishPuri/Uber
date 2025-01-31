const express = require('express');
const { body } = require('express-validator');
const userRouter = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');

const { registerUser, login, getUserProfile, logout } = require('../controllers/user.controllers');

userRouter.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First Name Should have atleast 3 characters'),
    body('password').isLength({ min: 6 }).withMessage("Password Should have atleast 6 characters!")
], registerUser);

userRouter.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage("Password Should have atleast 6 characters!")
], login);

userRouter.get('/profile', authMiddleware, getUserProfile);

userRouter.post('/logout', logout);

module.exports = userRouter;