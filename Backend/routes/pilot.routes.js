const express = require('express');
const pilotRouter = express.Router();
const { body } = require('express-validator');

const { registerPilot, login, logout, getPilotProfile } = require('../controllers/pilot.controllers');
const { pilotAuthMiddleware } = require('../middleware/auth.middleware');

pilotRouter.post('/register', [
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color is required'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate is required'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity is required'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type is required')
], registerPilot);

pilotRouter.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters')
], login);

pilotRouter.post('/logout', logout);

pilotRouter.get('/profile', pilotAuthMiddleware, getPilotProfile);

module.exports = pilotRouter;