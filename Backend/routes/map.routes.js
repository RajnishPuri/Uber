const express = require('express');
const { getCoordinates, getDrivingDistanceWithCoordinates, getAutoCompleteSuggestions } = require('../controllers/mapController');
const { authMiddleware } = require('../middleware/auth.middleware');

const { query } = require('express-validator');

const mapRouter = express.Router();

// Route to get coordinates from an address
mapRouter.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }).withMessage('Address is required'),
    authMiddleware, getCoordinates);

mapRouter.get('/get-driving-distance-coordinates',
    query('lat1').isNumeric().withMessage('Latitude 1 is required'),
    query('lon1').isNumeric().withMessage('Longitude 1 is required'),
    query('lat2').isNumeric().withMessage('Latitude 2 is required'),
    query('lon2').isNumeric().withMessage('Longitude 2 is required'),
    authMiddleware,
    getDrivingDistanceWithCoordinates);

mapRouter.get('/autocomplete',
    authMiddleware,
    getAutoCompleteSuggestions);

module.exports = mapRouter;
