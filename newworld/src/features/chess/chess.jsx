import React, { useEffect, useRef, useState } from "react";
import chessstyle from "./chess.module.css";
import { Canvas } from "react-three-fiber";
import Board from "./Board";
import io from "socket.io-client";
import Pieces from "./pieces";
import centerPosition from "../../constants/center.json";
import LoadPieces from "./LoadPieces";
import img1 from "../../assets/images/sky/1.jpg"
import img2 from "../../assets/images/sky/2.jpg"
import img3 from "../../assets/images/sky/3.jpg"
import img4 from "../../assets/images/sky/4.jpg"
import img5 from "../../assets/images/sky/5.jpg"
import img6 from "../../assets/images/sky/6.jpg"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


import Chat from "../Chat/chat";
import {
  CubeTextureLoader,
  CubeCamera,
  WebGLCubeRenderTarget,
  RGBFormat,
  LinearMipmapLinearFilter,
} from "three";
import { extend, useThree, useFrame } from "react-three-fiber";
const socket = io("http://localhost:8888");
extend({ OrbitControls });
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
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    // Event listeners
    socket.on("message", (message) => {
      console.log(message);
    });

    socket.on("existingUsers", ({ users, currentUserId }) => {
      setUsers(users);
      setCurrentUserId(currentUserId);
    });

    socket.on("roomDetail", ({ users }) => {
      console.log("====================================");
      console.log(users);
      console.log("====================================");
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
  const boardSelection = (vlaue) => {
    let postion = centerPosition;
    let axisValue = convertToChessPosition(vlaue);
    console.log(postion[axisValue]);
    setx(postion[axisValue].x);
    sety(postion[axisValue].y);
  };

  function convertToChessPosition(tilePosition) {
    var file = String.fromCharCode("a".charCodeAt(0) + tilePosition[0]);
    var rank = (8 - tilePosition[1]).toString();
    return file + rank;
  }
  const [firstColor, setfirstColor] = useState("#ffffff");
  const [secondColor, setsecondColor] = useState("#000000");
  const setColor = (e) => {
    setfirstColor(e.target.value);
  };
  const setColor2 = (e) => {
    setsecondColor(e.target.value);
  };

  const [x, setx] = useState(0);
  const [y, sety] = useState(0);
  const [tilePosition, settilePosition] = useState({});
  const setX = (value) => {
    // setx(value);
  };
  const setY = (value) => {
    // sety(value);
  };
  const setCordinates = (value) => {
    settilePosition(value);
  };


  return (
    <div className={chessstyle.chessBody}>
      <div className={chessstyle.chessBoard}>
        <Canvas>
        <CameraControls />
          <Pieces x={x} y={y} coordinates={tilePosition} />
          <Board
            selection={boardSelection}
            color1={firstColor}
            color2={secondColor}
            x={setX}
            y={setY}
            selectedCordinate={setCordinates}
          />
          <LoadPieces />
          <SkyBox />
        </Canvas>
      </div>
      <div className={chessstyle.rightSection}>
        <div className={chessstyle.rightSectionColour}>
          <h3>Board Color</h3>
          <div>
            <input
              type="color"
              id="favcolor"
              name="favcolor"
              value={firstColor}
              onChange={setColor}
            />
          </div>
          <div>
            <input
              type="color"
              id="favcolor"
              name="favcolor"
              value={secondColor}
              onChange={setColor2}
            />
          </div>
        </div>

        <div className={chessstyle.rightSectionChat}>
          <Chat />
        </div>
      </div>

      {/*
       <label for="favcolor">color 1:</label>
      <input
        type="color"
        id="favcolor"
        name="favcolor"
        value={firstColor}
        onChange={setColor}
      />
      <label for="favcolor"> color: 2</label>
      <input
        type="color"
        id="favcolor"
        name="favcolor"
        value={secondColor}
        onChange={setColor2}
      />
      <div id="new-mesh-container">

      </div>
      <Canvas>
        <mesh position={[-3.83, 3.86, 0]}>
          <boxBufferGeometry args={[0.2, 0.2, 0.2]} />
          <meshBasicMaterial color={"red"} />
        </mesh>

        
        <Pieces x={x} y={y} coordinates={tilePosition} />
        <Board
          selection={boardSelection}
          color1={firstColor}
          color2={secondColor}
          x={setX}
          y={setY}
          selectedCordinate={setCordinates}
        />
      <LoadPieces/>
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
      </div> */}
    </div>
  );
};
function SkyBox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
}

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement }
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  // useFrame(() => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      autoRotate={true}
      enableZoom={false}
    />
  );
};
export default Chess;
