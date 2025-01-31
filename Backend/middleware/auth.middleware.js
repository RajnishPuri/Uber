const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const BlackListToken = require('../models/blackListToken.model');
const Pilot = require('../models/pilot.model');

exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log(token);

    const blackListToken = await BlackListToken.findOne({ token: token });

    if (blackListToken) {
        return res.status(401).json({ message: 'Token is Expired!' });
    }

    if (token) {
        try {
            const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded_token._id);
            req.user = user;
            console.log(user);
            return next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    } else {
        return res.status(401).json({ message: 'Authorization header is missing or malformed' });
    }
};

exports.pilotAuthMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log(token);

    const blackListToken = await BlackListToken.findOne({ token: token });
    console.log(blackListToken);

    if (blackListToken) {
        return res.status(401).json({ message: 'Token is Expired!' });
    }

    if (token) {
        try {
            const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
            const pilot = await Pilot.findById(decoded_token._id);
            req.pilot = pilot;
            console.log("pilot : ", pilot);
            return next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    } else {
        return res.status(401).json({ message: 'Authorization header is missing or malformed' });
    }
};