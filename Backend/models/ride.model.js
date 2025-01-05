const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    vehicleType: {
        type: String,
        required: true,
    },
    timeTaken: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    pilot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pilot',
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed', 'cancelled'],
        default: 'pending',
    },
    otp: {
        type: Number,
        select: false,
        requires: true,
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'credit-card', 'debit-card'],
        default: 'cash',
    }
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);