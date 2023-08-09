const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Chess } = require('chess.js');

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





// Create a new chess game
const game = new Chess();

// Get the initial position as a FEN string
const initialFEN = game.fen();

// Convert FEN string to position object
const position = fenToPosition(initialFEN);

// Helper function to convert FEN string to position object
function fenToPosition(fen) {
  const [board, turn, castling, enPassant, halfMoves, fullMoves] = fen.split(' ');

  const rows = board.split('/');
  const position = {};

  for (let i = 0; i < 8; i++) {
    let row = rows[i];
    let column = 0;

    for (let j = 0; j < row.length; j++) {
      const char = row.charAt(j);

      if (isNaN(char)) {
        position[`${String.fromCharCode(97 + column)}${8 - i}`] = char;
        column++;
      } else {
        column += parseInt(char);
      }
    }
  }

  return position;
}

// Log the position object
console.log(position);
