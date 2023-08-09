let ioObj;
const users = [];

function randomRoomId() {
  let roomId = "";
  const length = 12;
  const randomChar =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let counter = 0; counter < length; counter++) {
    roomId += randomChar.charAt(Math.floor(Math.random() * randomChar.length));
  }

  return roomId;
}

const connect = (io) => {
  ioObj = io;
  io.on("connection", (socket) => {
    console.log("user conected");
    socket.emit("message", "Welcome to the chess app!");

    socket.on("submitName", (formData) => {
      const userName = formData.name;
      console.log("====================================");
      console.log(userName);

      const room = randomRoomId();

      users.push({
        id: socket.id,
        name: userName,
        room: room,
      });

      socket.join(room);
      socket.emit("roomDetail", {
        users: users,
      });
    });

    socket.emit("existingUsers", {
      users: users,
      currentUserId: socket.id,
    });

    socket.on("sendJoinRequest", (requestData) => {
      const user = users.filter((user) => user.id === socket.id)[0];
      socket.broadcast.to(requestData.room).emit("joinRequestReceived", {
        id: user.id,
        name: user.name,
        room: user.room,
      });
    });

    socket.on("acceptGameRequest", (requestData) => {
      const user = users.filter((user) => user.id === socket.id)[0];
      socket.broadcast.to(requestData.room).emit("gameRequestAccepted", {
        id: user.id,
        name: user.name,
        room: user.room,
      });
    });

    socket.on("setOrientation", (requestData) => {
      const user = users.filter((user) => user.id === socket.id)[0];
      socket.broadcast.to(requestData.room).emit("setOrientationOppnt", {
        color: requestData.color,
        id: user.id,
        name: user.name,
        room: user.room,
      });
    });

    socket.on("chessMove", (requestData) => {
      socket.broadcast.to(requestData.room).emit("oppntChessMove", {
        color: requestData.color,
        from: requestData.from,
        to: requestData.to,
        piece: requestData.piece,
        promo: requestData.promo || "",
      });
    });

    socket.on("gameWon", (requestData) => {
      socket.broadcast.to(requestData.room).emit("oppntWon");
    });

    socket.on("disconnect", () => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === socket.id) {
          users.splice(i, 1);
          break;
        }
      }
    });
  });
};

module.exports = { connect };
