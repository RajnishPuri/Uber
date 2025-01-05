const Pilot = require('../models/pilot.model');

const axios = require('axios');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAP_API;


exports.getAddressWithCoordinates = async (latitude, longitude) => {
    try {
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            throw new Error('Invalid latitude or longitude provided.');
        }

        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                latlng: `${latitude},${longitude}`,
                key: GOOGLE_MAPS_API_KEY,
            },
        });

        console.log('API Response:', response.data);

        if (response.data.status === 'OK') {
            const address = response.data.results[0].formatted_address;
            return address;
        } else if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('No nearby address found for the given coordinates.');
        } else if (response.data.status === 'REQUEST_DENIED') {
            throw new Error('Request denied: Check your API key and billing settings.');
        } else {
            throw new Error(`Geocoding failed: ${response.data.status}`);
        }
    } catch (error) {
        console.error(`Error fetching address:`, error.message);
        return { success: false, error: 'Unable to fetch address coordinates.' };
    }
};


exports.getAddressCoordinate = async (address) => {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: address,
                key: GOOGLE_MAPS_API_KEY,
            },
        });

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                latitude: location.lat,
                longitude: location.lng,
            };
        } else {
            throw new Error(`Geocoding failed: ${response.data.status}`);
        }
    } catch (error) {
        console.error(`Error fetching coordinates for address "${address}":`, error.message);
        throw new Error('Unable to fetch address coordinates.');
    }
};


exports.getDrivingDistance = async (origin, destination) => {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
            params: {
                origins: origin,
                destinations: destination,
                key: GOOGLE_MAPS_API_KEY,
            },
        });

        if (response.data.status === 'OK') {
            const result = response.data.rows[0].elements[0];
            if (result.status === 'OK') {
                const distanceInKm = (result.distance.value / 1000).toFixed(2);
                const durationInHours = (result.duration.value / 3600).toFixed(2);

                return {
                    success: true,
                    distance: result.distance.text,
                    duration: result.duration.text,
                    rawDistance: result.distance.value,
                    rawDuration: result.duration.value,
                    distanceInKm: `${distanceInKm} km`,
                    durationInHours: `${durationInHours} hr`,
                };
            } else {
                throw new Error(`Route calculation failed: ${result.status}`);
            }
        } else {
            throw new Error(`API response error: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching driving distance:', error.message);
        throw new Error('Failed to fetch driving distance.');
    }
};

exports.getAutoCompleteSuggestions = async (input) => {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
            params: {
                input: input,
                key: GOOGLE_MAPS_API_KEY,
            },
        });

        if (response.data.status === 'OK') {
            return {
                success: true,
                suggestions: response.data.predictions,  // Array of suggestions
            };
        } else {
            throw new Error('No autocomplete suggestions found.');
        }
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error.message);
        throw new Error('Failed to fetch autocomplete suggestions.');
    }
};

exports.getPilotInTheRadius = async (latitude, longitude, radius) => {
    try {
        const pilots = await Pilot.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[longitude, latitude], radius / 6378.1],
                },
            },
        });

        return pilots;
    } catch (error) {
        console.error('Error fetching pilots in the radius:', error.message);
        throw new Error('Failed to fetch pilots in the radius.');
    }
};
