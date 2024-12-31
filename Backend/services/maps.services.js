const axios = require('axios');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAP_API;


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
                // Convert raw distance from meters to kilometers
                const distanceInKm = (result.distance.value / 1000).toFixed(2); // km
                // Convert raw duration from seconds to hours
                const durationInHours = (result.duration.value / 3600).toFixed(2); // hours

                return {
                    success: true,
                    distance: result.distance.text, // Distance in human-readable format (e.g., "10.5 km")
                    duration: result.duration.text, // Duration in human-readable format (e.g., "12 mins")
                    rawDistance: result.distance.value, // Distance in meters
                    rawDuration: result.duration.value, // Duration in seconds
                    distanceInKm: `${distanceInKm} km`, // Converted distance in km
                    durationInHours: `${durationInHours} hr`, // Converted duration in hours
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
        // Make a request to the Google Places API for autocomplete suggestions
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
            params: {
                input: input,
                key: GOOGLE_MAPS_API_KEY,
            },
        });

        // Check if the API returns predictions
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
