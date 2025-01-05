const User = require('../models/user.model');
const BlackListToken = require('../models/blackListToken.model');
const { createUser } = require('../services/user.services');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { fullName, email, password } = req.body;
    const hashedPassword = await User.hashPassword(password);

    const user = await createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword
    });

    const token = await user.generateAuthToken();

    res.status(201).json({ token, user, role: 'user' });

}

exports.login = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({
            success: false,
            message: "All fields are required!"
        });
    }

    const checkUser = await User.findOne({ email: email }).select('+password');
    const user = await User.findOne({ email: email });

    if (!checkUser) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password!"
        });
    }

    const isMatch = await checkUser.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password!"
        });
    }

    const token = checkUser.generateAuthToken();
    res.cookie('token', token);


    res.status(200).json({
        success: true,
        message: "Login successful!",
        token,
        role: "user",
        user
    });
};


exports.getUserProfile = async (req, res, next) => {
    const user = req.user;
    return res.status(201).json({
        user
    })
}

exports.logout = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        await BlackListToken.create({ token });
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged Out' });
    }
    catch (e) {
        return res.status(401).json({ success: false, message: "User Already Logged Out!" })
    }
}