import React, { useEffect, useRef, useState } from "react";
import chessstyle from "./chess.module.css";
import { Canvas } from "react-three-fiber";
import Board from "./Board";
import io from "socket.io-client";

const socket = io("http://localhost:8888");

const Chess = () => {
  // const [socket, setSocket] = useState(null);
  // useEffect(() => {
  //   const socket = socketIOClient("http://localhost:8888", {
  //     path: "/socket.io",
  //   });
  //   setSocket(socket);

  //  // Event listeners
  //   socket.on('connect', () => {
  //     console.log('Connected to server');
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    // Event listeners
    socket.on("message", (message) => {
      console.log(message);
    });

    socket.on("existingUsers", ({ users, currentUserId }) => {
      setUsers(users);
      setCurrentUserId(currentUserId);
    });

    socket.on("roomDetail", ({ users }) => {
      console.log('====================================');
      console.log(users);
      console.log('====================================');
      setUsers(users);
    });

    return () => {
      // Clean up event listeners
      socket.off("message");
      socket.off("existingUsers");
      socket.off("roomDetail");
    };
  }, []);

  const handleSubmitName = (e) => {
    e.preventDefault();
    socket.emit("submitName", { name: userName });
    setUserName("");
  };

  const handleJoinRequest = (room) => {
    socket.emit("sendJoinRequest", { room });
  };

  return (
    <div className={chessstyle.chessBody}>
      <Canvas>
        <Board />
      </Canvas>

      <div className={chessstyle.roomBoard}>
        <h1>Welcome to the Chess App</h1>
        <form onSubmit={handleSubmitName}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
          />
          <button type="submit">Submit</button>
        </form>
        <h2>Users:</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - Room: {user.room}
              {user.id === currentUserId && <span> (You)</span>}
              {user.id !== currentUserId && (
                <button onClick={() => handleJoinRequest(user.room)}>
                  Join
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chess;
