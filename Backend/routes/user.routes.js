const express = require('express');
const { body } = require('express-validator');
const userRouter = express.Router();

const { registerUser, login } = require('../controllers/user.controllers');

userRouter.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First Name Should have atleast 3 characters'),
    body('password').isLength({ min: 6 }).withMessage("Password Should have atleast 6 characters!")
], registerUser);
userRouter.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage("Password Should have atleast 6 characters!")
], login);

module.exports = userRouter;