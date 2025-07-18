// Entry Point: server.js

require('dotenv').config(); // Load env variables first
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const path = require('path');

// Routes
const rideRoutes = require('./routes/rideRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Utils (MPESA & PDF Receipts - used in routes/controllers)
const generateReceipt = require('./utils/pdfGenerator');
const mpesa = require('./utils/mpesa');

// Create app and HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files (HTML, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'frontend')));

// API Routes
app.use('/api/rides', rideRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

// SPA or HTML fallback (adjust based on entry file)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'rider.html'));
});

// Socket.IO: Modular real-time driver/rider tracking
const initializeSocket = require('./sockets/socketHandler');
initializeSocket(io);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
