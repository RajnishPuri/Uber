const express = require('express');
const rideRouter = express.Router();
const { initializeRide, createRide, confirmRide, startRide } = require('../controllers/RideController');
const { authMiddleware, pilotAuthMiddleware } = require('../middleware/auth.middleware');

rideRouter.post('/initialize', initializeRide);

rideRouter.post('/create-ride', authMiddleware, createRide);

rideRouter.post('/confirm-ride/:rideId', pilotAuthMiddleware, confirmRide);

rideRouter.post('/start-ride/:rideId', pilotAuthMiddleware, startRide);


module.exports = rideRouter;

