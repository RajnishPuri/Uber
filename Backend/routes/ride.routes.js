const express = require('express');
const rideRouter = express.Router();
const { initializeRide, createRide } = require('../controllers/RideController');
const { authMiddleware } = require('../middleware/auth.middleware');

rideRouter.post('/initialize', initializeRide);

rideRouter.post('/create-ride', authMiddleware, createRide);


module.exports = rideRouter;

