const { getAddressCoordinate, getDrivingDistance, getAutoCompleteSuggestions } = require('../services/maps.services');

const { validationResult } = require('express-validator');

// Controller to handle address-to-coordinate requests
exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query; // Expecting the address in the query string

    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        const coordinates = await getAddressCoordinate(address);
        res.status(200).json({ success: true, coordinates });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Function to calculate the distance between two coordinates


exports.getDrivingDistanceWithCoordinatesParams = async (req, res) => {
    const { lat1, lon1, lat2, lon2 } = req.query;

    // Check if all coordinates are provided
    if (!lat1 || !lon1 || !lat2 || !lon2) {
        return res.status(400).json({
            success: false,
            error: 'All coordinates (lat1, lon1, lat2, lon2) are required.',
        });
    }

    try {
        const origin = `${lat1},${lon1}`;
        const destination = `${lat2},${lon2}`;
        const result = await getDrivingDistance(origin, destination);

        // Return the result with converted values
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.getDrivingDistanceWithCoordinates = async (lat1, lon1, lat2, lon2) => {
    console.log('Received coordinates:', lat1, lon1, lat2, lon2);
    if (!lat1 || !lon1 || !lat2 || !lon2) {
        throw new Error('All coordinates (lat1, lon1, lat2, lon2) are required.');
    }

    try {
        const origin = `${lat1},${lon1}`;
        const destination = `${lat2},${lon2}`;
        const result = await getDrivingDistance(origin, destination);
        return result;
    } catch (error) {
        console.error('Error fetching distance with coordinates:', error.message);
        throw new Error('Failed to fetch driving distance.');
    }
};


exports.getAutoCompleteSuggestions = async (req, res) => {
    const { input } = req.query;

    if (!input) {
        return res.status(400).json({
            success: false,
            error: 'Input is required.',
        });
    }

    try {
        const result = await getAutoCompleteSuggestions(input);
        res.status(200).json(result); // Return the suggestions to the frontend
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};




