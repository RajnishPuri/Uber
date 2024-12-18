const User = require('../models/user.model');

exports.createUser = async ({ firstName, lastName, email, password }) => {
    if (!firstName || !email || !password) {
        throw new Error('All fields are Required!');
    }

    const user = User.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    });

    return user;
}