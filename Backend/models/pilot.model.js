const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pilotSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First Name Should have minimum 3 Characters']
        },
        lastName: {
            type: String,
            minlength: [3, 'Last Name Should have minimum 3 Characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email Should have minimum 5 Characters'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color Should have minimum 3 Characters']
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate Should have minimum 3 Characters']
        },
        capacity: {
            type: Number,
            required: true,
            minlength: [1, 'Capacity Should have minimum 1 Characters']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto']
        }
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // Must be 'Point'
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number], // Array of [longitude, latitude]
            required: true,
            default: [0, 0]
        }
    }
});

// Add a 2dsphere index on the location field for geospatial queries
pilotSchema.index({ location: '2dsphere' });

pilotSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

pilotSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

pilotSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model("Pilot", pilotSchema);
