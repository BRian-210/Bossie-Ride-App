// Socket.IO driver tracking logic
const drivers = {};

function initializeSocket(io) {
  io.on('connection', (socket) => {
    console.log('🟢 Socket connected:', socket.id);

    socket.on('driverLocation', (data) => {
      if (data.driverId && data.location) {
        drivers[data.driverId] = data.location;
        io.emit('updateDriverLocation', {
          driverId: data.driverId,
          location: data.location,
        });
      }
    });

    socket.on('disconnect', () => {
      console.log('🔴 Socket disconnected:', socket.id);
    });
  });
}

module.exports = initializeSocket;
