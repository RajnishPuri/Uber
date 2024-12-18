const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const BlackListToken = require('../models/blackListToken.model');

exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    const blackListToken = await BlackListToken.findOne({ token: token });

    if (blackListToken) {
        return res.status(401).json({ message: 'Token is Expired!' });
    }

    if (token) {
        try {
            const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded_token._id);
            req.user = user;
            return next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    } else {
        return res.status(401).json({ message: 'Authorization header is missing or malformed' });
    }
};
