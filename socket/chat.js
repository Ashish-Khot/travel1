const socketio = require('socket.io');
const Booking = require('../models/Booking');

function setupSocket(server) {
  const io = socketio(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    socket.on('joinRoom', ({ bookingId }) => {
      socket.join(bookingId);
    });

    socket.on('chatMessage', async ({ bookingId, senderId, content }) => {
      const message = {
        sender: senderId,
        text: content,
        sentAt: new Date()
      };
      // Save message to DB
      await Booking.findByIdAndUpdate(
        bookingId,
        { $push: { messages: message } }
      );
      io.to(bookingId).emit('newMessage', message);
    });
  });
}

module.exports = setupSocket;
