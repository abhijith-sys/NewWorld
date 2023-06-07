const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// // Socket.IO code
// io.on('connection', (socket) => {
//   // Handle socket events
//   // ...

//   // Example: Send a welcome message to the connected client
//   socket.emit('message', 'Welcome to the chess app!');
// });

const httpPort = process.env.HTTP_PORT || 8080;
httpServer.listen(httpPort, () => {
  console.log(`HTTP server is running on port ${httpPort}`);
});

const socketPort = process.env.SOCKET_PORT || 8888;
io.listen(socketPort);

require("./src/controller/socketController").connect(io);
console.log(`Socket.IO server is running on port ${socketPort}`);
