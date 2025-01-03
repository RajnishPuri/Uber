const express = require('express');
const rideRouter = express.Router();
const { initializeRide } = require('../controllers/RideController');

rideRouter.post('/initialize', initializeRide);


module.exports = rideRouter;

