const User = require('../models/user.model');
const Pilot = require('../models/pilot.model');
const { getAddressCoordinate } = require('../services/maps.services');
const { getDrivingDistanceWithCoordinates } = require('../controllers/mapController');

exports.initializeRide = async (req, res) => {
    function isLatLong(input) {
        const match = input.match(/Lat:\s*([-+]?[0-9]*\.?[0-9]+),\s*Lng:\s*([-+]?[0-9]*\.?[0-9]+)/);
        if (match) {
            const lat = parseFloat(match[1]);
            const lng = parseFloat(match[2]);
            if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
                return [lat, lng];
            }
        }
        return false;
    }

    try {
        const { pickup, destination } = req.body;

        if (!pickup || !destination) {
            return res.status(400).json({ success: false, error: 'Pickup and destination are required.' });
        }

        if (pickup === destination) {
            return res.status(400).json({ success: false, error: 'Pickup and dropoff cannot be the same.' });
        }
        console.log('Pickup:', pickup);
        const pickupCoordinates = isLatLong(pickup);
        if (pickupCoordinates) {
            console.log('Pickup is in latitude and longitude format:', pickupCoordinates);
            console.log(destination);

            const destinationCoordinates = await getAddressCoordinate(destination);

            console.log('Destination coordinates:', destinationCoordinates);

            const { latitude, longitude } = destinationCoordinates;
            console.log(latitude); // 25.5940947
            console.log(longitude); // 85.1375645


            const lat1 = pickupCoordinates[0];
            const lon1 = pickupCoordinates[1];
            const lat2 = latitude;
            const lon2 = longitude;

            const distanceData = await getDrivingDistanceWithCoordinates(lat1, lon1, lat2, lon2);
            console.log('Distance:', distanceData);

            const vehicles = [
                { type: 'Car', speed: 60, pricePerKm: 1.5 },
                { type: 'Bike', speed: 40, pricePerKm: 0.5 },
                { type: 'Auto', speed: 50, pricePerKm: 1 },
            ];

            // Calculate price and time for each vehicle type
            const vehicleDetails = vehicles.map(vehicle => {
                const timeTakenInHours = (distanceData.rawDistance / 1000) / vehicle.speed; // time in hours
                const hours = Math.floor(timeTakenInHours); // Whole hours
                const minutes = Math.round((timeTakenInHours - hours) * 60); // Convert decimal part to minutes

                const price = (distanceData.rawDistance / 1000) * vehicle.pricePerKm; // price in currency units

                return {
                    type: vehicle.type,
                    distance: distanceData.distanceInKm,
                    timeTaken: `${hours} hours ${minutes} mins`, // Formatted as hours and minutes
                    price: `${price.toFixed(2)}`,
                    duration: distanceData.duration,
                };
            });


            // Log the details for each vehicle
            console.log('Vehicle Options:', vehicleDetails);

            return res.status(200).json({
                success: true,
                message: 'Ride initialized successfully.',
                vehicleDetails,
            });
        } else {
            console.log('Pickup is a place name.');


            const pickupCoordinates = await getAddressCoordinate(pickup);
            console.log('Pickup coordinates:', pickupCoordinates);

            // Destructure and rename the properties for pickup coordinates
            const { latitude: pickupLatitude, longitude: pickupLongitude } = pickupCoordinates;
            console.log('Pickup Latitude:', pickupLatitude); // e.g., 25.5940947
            console.log('Pickup Longitude:', pickupLongitude); // e.g., 85.1375645

            const destinationCoordinates = await getAddressCoordinate(destination);
            console.log('Destination coordinates:', destinationCoordinates);

            // Destructure and rename the properties for destination coordinates
            const { latitude: destinationLatitude, longitude: destinationLongitude } = destinationCoordinates;
            console.log('Destination Latitude:', destinationLatitude); // e.g., 25.5940947
            console.log('Destination Longitude:', destinationLongitude); // e.g., 85.1375645

            // Assigning coordinates to variables for use in the distance calculation
            const lat1 = pickupLatitude;
            const lon1 = pickupLongitude;
            const lat2 = destinationLatitude;
            const lon2 = destinationLongitude;


            const distanceData = await getDrivingDistanceWithCoordinates(lat1, lon1, lat2, lon2);
            console.log('Distance:', distanceData);

            const vehicles = [
                { type: 'Car', speed: 60, pricePerKm: 1.5 },
                { type: 'Bike', speed: 40, pricePerKm: 0.5 },
                { type: 'Auto', speed: 50, pricePerKm: 1 },
            ];

            // Calculate price and time for each vehicle type
            const vehicleDetails = vehicles.map(vehicle => {
                const timeTakenInHours = (distanceData.rawDistance / 1000) / vehicle.speed; // time in hours
                const hours = Math.floor(timeTakenInHours); // Whole hours
                const minutes = Math.round((timeTakenInHours - hours) * 60); // Convert decimal part to minutes

                const price = (distanceData.rawDistance / 1000) * vehicle.pricePerKm; // price in currency units

                return {
                    type: vehicle.type,
                    distance: distanceData.distanceInKm,
                    timeTaken: `${hours} hours ${minutes} mins`, // Formatted as hours and minutes
                    price: `${price.toFixed(2)}`,
                    duration: distanceData.duration,
                };
            });


            // Log the details for each vehicle
            console.log('Vehicle Options:', vehicleDetails);


            return res.status(200).json({
                success: true,
                message: 'Ride initialized successfully.',
                vehicleDetails,
            });
        }
    } catch (error) {
        console.error('Error initializing ride:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};


