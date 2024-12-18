const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL || null;

const dbConnect = async () => {
    return await mongoose.connect(DB_URL);
}

module.exports = dbConnect;