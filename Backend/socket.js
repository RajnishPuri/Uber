const socketIo = require('socket.io');
const User = require('./models/user.model');
const Pilot = require('./models/pilot.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            credentials: true,
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`A user connected: ${socket.id}`);

        socket.on('join', async (data) => {
            try {
                if (!data || !data.userId || !data.userType) {
                    return socket.emit('error', { message: 'Invalid join data' });
                }

                const { userId, userType } = data;
                console.log(`User ${userId} joined with type ${userType}`);

                if (userType === 'user') {
                    const user = await User.findById(userId);
                    if (!user) {
                        return socket.emit('error', { message: 'User not found' });
                    }
                    user.socketId = socket.id;
                    await user.save();
                } else if (userType === 'pilot') {
                    const pilot = await Pilot.findById(userId);
                    if (!pilot) {
                        return socket.emit('error', { message: 'Pilot not found' });
                    }
                    pilot.socketId = socket.id;
                    await pilot.save();
                } else {
                    return socket.emit('error', { message: 'Invalid user type' });
                }
            } catch (error) {
                console.error('Error in join event:', error.message);
                socket.emit('error', { message: 'Failed to join' });
            }
        });

        socket.on('update-location-pilot', async (data) => {
            try {
                if (!data || !data.userId || !data.location) {
                    return socket.emit('error', { message: 'Invalid location data' });
                }

                const { userId, location } = data;
                const { lat, lng } = location;

                // Validate latitude and longitude
                if (typeof lat !== 'number' || typeof lng !== 'number') {
                    return socket.emit('error', { message: 'Invalid latitude or longitude' });
                }

                // Find the pilot
                const pilot = await Pilot.findById(userId);
                if (!pilot) {
                    return socket.emit('error', { message: 'Pilot not found' });
                }

                // Update pilot's location in GeoJSON format
                pilot.location = {
                    type: 'Point',
                    coordinates: [lng, lat] // GeoJSON requires [longitude, latitude]
                };

                await pilot.save();

                console.log(`Updated location for pilot ${pilot._id}:`, pilot.location);
                socket.emit('location-updated', { message: 'Location updated successfully' });
            } catch (error) {
                console.error('Error in update-location-pilot event:', error.message);
                socket.emit('error', { message: 'Failed to update location' });
            }
        });


        socket.on('disconnect', async () => {
            try {
                console.log(`User disconnected: ${socket.id}`);
                // Optionally, remove the `socketId` from the database
                await User.updateMany({ socketId: socket.id }, { $unset: { socketId: '' } });
                await Pilot.updateMany({ socketId: socket.id }, { $unset: { socketId: '' } });
            } catch (error) {
                console.error('Error during disconnect handling:', error.message);
            }
        });
    });
}

function sendMessage(socketId, messageObject) {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket not initialized');
    }
}

module.exports = {
    initializeSocket,
    sendMessage
};
