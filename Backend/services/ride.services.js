const Ride = require('../models/ride.model');
const User = require('../models/user.model');
const Pilot = require('../models/pilot.model');

exports.confirmRide = async (rideId, pilotId) => {
    try {
        if (!rideId) {
            throw new Error('Ride ID is required');
        }
        await Ride.findByIdAndUpdate(rideId, { status: 'accepted', pilot: pilotId });
        const ride = await Ride.findById(rideId).populate('user').populate('pilot');
        if (!ride) {
            throw new Error('Ride not found');
        }
        ride.status = 'accepted';
        await ride.save();
        return ride;
    }
    catch (error) {
        console.error(error);
        throw new Error('Failed to confirm ride');
    }
};

exports.startRide = async (rideId, pilotId, otp) => {
    try {
        if (!rideId) {
            throw new Error('Ride ID is required');
        }
        const ride = await Ride.findById(rideId)
            .populate('user')
            .populate('pilot')
            .select('+otp')
            .exec();
        if (!ride) {
            throw new Error('Ride not found');
        }
        if (ride.status !== 'accepted') {
            throw new Error('Ride not accepted');
        }
        console.log(ride.otp, otp);
        if (ride.otp != otp) {
            throw new Error('Invalid OTP');
        }
        return ride;
    }
    catch (error) {
        console.error(error);
        throw new Error('Failed to start ride');
    }
};