const User = require('../models/user.model');
const Pilot = require('../models/pilot.model');
const { getAddressCoordinate, getPilotInTheRadius, getAddressWithCoordinates } = require('../services/maps.services');
const { getDrivingDistanceWithCoordinates } = require('../controllers/mapController');
const Ride = require('../models/ride.model');
const { sendMessage } = require('../socket');
const { confirmRide, startRide } = require('../services/ride.services');


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
            console.log(latitude);
            console.log(longitude);


            const lat1 = pickupCoordinates[0];
            const lon1 = pickupCoordinates[1];
            const lat2 = latitude;
            const lon2 = longitude;

            const distanceData = await getDrivingDistanceWithCoordinates(lat1, lon1, lat2, lon2);
            console.log('Distance:', distanceData);

            const vehicles = [
                { type: 'Car', speed: 60, pricePerKm: 1.5, seats: 4 },
                { type: 'Bike', speed: 40, pricePerKm: 0.5, seats: 2 },
                { type: 'Auto', speed: 50, pricePerKm: 1, seats: 3 },
            ];


            const vehicleDetails = vehicles.map(vehicle => {
                const timeTakenInHours = (distanceData.rawDistance / 1000) / vehicle.speed;
                const hours = Math.floor(timeTakenInHours);
                const minutes = Math.round((timeTakenInHours - hours) * 60);

                const price = (distanceData.rawDistance / 1000) * vehicle.pricePerKm;

                return {
                    type: vehicle.type,
                    distance: distanceData.distanceInKm,
                    timeTaken: `${hours} hours ${minutes} mins`,
                    price: `${price.toFixed(2)}`,
                    duration: distanceData.duration,
                    seats: vehicle.seats,
                };
            });


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

            const { latitude: pickupLatitude, longitude: pickupLongitude } = pickupCoordinates;
            console.log('Pickup Latitude:', pickupLatitude);
            console.log('Pickup Longitude:', pickupLongitude);

            const destinationCoordinates = await getAddressCoordinate(destination);
            console.log('Destination coordinates:', destinationCoordinates);

            const { latitude: destinationLatitude, longitude: destinationLongitude } = destinationCoordinates;
            console.log('Destination Latitude:', destinationLatitude);
            console.log('Destination Longitude:', destinationLongitude);

            const lat1 = pickupLatitude;
            const lon1 = pickupLongitude;
            const lat2 = destinationLatitude;
            const lon2 = destinationLongitude;


            const distanceData = await getDrivingDistanceWithCoordinates(lat1, lon1, lat2, lon2);
            console.log('Distance:', distanceData);

            const vehicles = [
                { type: 'Car', speed: 60, pricePerKm: 1.5, seats: 4 },
                { type: 'Bike', speed: 40, pricePerKm: 0.5, seats: 2 },
                { type: 'Auto', speed: 50, pricePerKm: 1, seats: 3 },
            ];

            const vehicleDetails = vehicles.map(vehicle => {
                const timeTakenInHours = (distanceData.rawDistance / 1000) / vehicle.speed;
                const hours = Math.floor(timeTakenInHours);
                const minutes = Math.round((timeTakenInHours - hours) * 60);

                const price = (distanceData.rawDistance / 1000) * vehicle.pricePerKm;

                return {
                    type: vehicle.type,
                    distance: distanceData.distanceInKm,
                    timeTaken: `${hours} hours ${minutes} mins`,
                    price: `${price.toFixed(2)}`,
                    duration: distanceData.duration,
                    seats: vehicle.seats
                };
            });


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


exports.createRide = async (req, res) => {
    try {
        const user = req.user;
        var pilotInRadius;
        const { type, pickup, destination, price, duration, distance, paymentMethod } = req.body;


        const coordinateRegex = /^Lat: (-?[\d]{1,2}\.\d+), Lng: (-?[\d]{1,3}\.\d+)$/;

        const otp = Math.floor(1000 + Math.random() * 9000);

        let isCoordinate = coordinateRegex.test(pickup);

        if (isCoordinate) {

            const matches = pickup.match(coordinateRegex);
            const latitude = parseFloat(matches[1]);
            const longitude = parseFloat(matches[2]);

            console.log(`Coordinates received - Latitude: ${latitude}, Longitude: ${longitude}`);

            pilotInRadius = await getPilotInTheRadius(latitude, longitude, 2);
            console.log(latitude, longitude);
            console.log('Pilot in radius:', pilotInRadius);




        } else {

            console.log(`Address received: ${pickup}`);
            const pickupCoordinates = await getAddressCoordinate(pickup);
            console.log(pickupCoordinates.latitude, pickupCoordinates.longitude);
            pilotInRadius = await getPilotInTheRadius(pickupCoordinates.latitude, pickupCoordinates.longitude, 2);
            console.log('Pilot in radius:', pilotInRadius);
        }



        const ride = new Ride({
            pickup,
            destination,
            distance,
            price,
            vehicleType: type,
            user: user._id,
            otp,
            paymentMethod
        });

        const savedRide = await ride.save();
        console.log('Saved Ride:', savedRide);


        const rideWithUser = await Ride.findById(savedRide._id).populate('user').select('-otp');

        pilotInRadius.map(async (pilot) => {
            console.log('Sending message to pilot:', pilot, ride);
            sendMessage(pilot.socketId, {
                event: 'new-ride',
                data: rideWithUser,
            })
        });

        return res.status(200).json({
            success: true,
            message: 'Ride created successfully.',
            ride: savedRide,
        });
    } catch (error) {
        console.error('Error creating ride:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.confirmRide = async (req, res) => {
    const { rideId } = req.params;
    const pilotId = req.pilot._id;
    console.log("Ride Controller : ", rideId, pilotId);

    try {
        const ride = await confirmRide(rideId, pilotId);
        const rideDetail = await Ride.findById(rideId)
            .populate('user')
            .populate('pilot')
            .select('+otp')
            .exec();

        console.log(rideDetail);

        sendMessage(ride.user.socketId, {
            event: 'ride-confirmed',
            data: rideDetail,
        })

        res.status(200).json({ success: true, message: 'Ride confirmed successfully.', ride });
    }
    catch (error) {
        console.log(error.message);
    }

}


exports.startRide = async (req, res) => {
    const { rideId } = req.params;
    const pilotId = req.pilot._id;
    const { otp } = req.body;
    console.log("Ride Controller : ", rideId, pilotId);
    try {
        const ride = await startRide(rideId, pilotId, otp);
        console.log(ride);
        res.status(200).json({ success: true, message: 'Ride started successfully.', ride });
        sendMessage(ride.user.socketId, {
            event: 'ride-started',
            data: ride,
        })
        sendMessage(ride.pilot.socketId, {
            event: 'ride-started',
            data: rideDetail,
        })
    }
    catch (error) {
        console.log(error.message);
    }
}

