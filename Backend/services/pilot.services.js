const Pilot = require('../models/pilot.model');

exports.createPilot = async ({ firstName, lastName, email, password, color, plate, capacity, vehicleType }) => {
    if (!firstName || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are Required!');
    }
    const pilot = Pilot.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    return pilot;
}