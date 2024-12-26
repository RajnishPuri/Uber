const Pilot = require('../models/pilot.model');
const { createPilot } = require('../services/pilot.services');
const { validationResult } = require('express-validator');
const BlackListToken = require('../models/blackListToken.model');

exports.registerPilot = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()
            });
        }

        const { fullName, email, password, vehicle } = req.body;

        const pilotExist = await Pilot.findOne({ email });
        if (pilotExist) {
            return res.status(400).json({
                success: false,
                message: 'Pilot already exists'
            });
        }

        const hashPassword = await Pilot.hashPassword(password);

        const pilot = await createPilot({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = pilot.generateAuthToken();

        res.status(201).json({
            success: true,
            message: 'Pilot Registered Successfully',
            token,
            pilot,
            role: 'pilot'
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

exports.login = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { email, password } = req.body;
        const pilot = await Pilot.findOne({ email }).select('+password');
        if (!pilot) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }
        const isMatch = await pilot.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }
        const token = pilot.generateAuthToken();
        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });

        res.status(200).json({
            success: true,
            message: 'Login Successfully',
            token,
            pilot,
            role: 'pilot'
        });
    }
    catch
    (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}



exports.logout = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        await BlackListToken.create({ token: token });
        res.clearCookie('token');
        res.status(200).json({
            success: true,
            message: 'Logout Successfully'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

exports.getPilotProfile = async (req, res, next) => {
    try {
        const pilot = req.pilot;
        res.status(200).json({
            success: true,
            pilot
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}