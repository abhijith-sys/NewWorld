import React, { useRef, useEffect, useState } from "react";
import { useThree, extend, useFrame } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Tile from "./Tile";
import * as THREE from 'three';
extend({ OrbitControls });

const Board = (props) => {
  const { color1, color2 } = props;
  const ref = useRef();
  const { camera, gl } = useThree();
  const [spacing, setSpacing] = useState(0.9);

  const postion = {
    tileX: "",
    tileY: "",
    pieceX: "",
    pieceY: "",
  };

  const [activeX, setActiveX] = useState(null);
  const [activeY, setActiveY] = useState(null);

  const [activePieceX, setActivePieceX] = useState(null);
  const [activePieceY, setActivePieceY] = useState(null);
  const [location, setLocation] = useState(postion);
  const currentMotion = useRef(postion);
  const bulbLightRef = useRef();
  const hemiLightRef = useRef();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.zoomSpeed = 0.8;
    camera.position.set(0, 0, 10);

    controls.update();





    // const bulbLight = bulbLightRef.current;
    // const hemiLight = hemiLightRef.current;

    // // Set up the bulb light
    // const bulbGeometry = new THREE.SphereGeometry(0.02, 16, 8);
    // bulbLight.position.set(0, 2, 0);
    // bulbLight.castShadow = true;
    // bulbLight.add(new THREE.Mesh(bulbGeometry, new THREE.MeshStandardMaterial({ emissive: 0xffffee, emissiveIntensity: 1, color: 0x000000 })));

    // // Set up the hemisphere light
    // hemiLight.position.set(0, 1, 0);
    
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);

  useFrame(({ clock }) => {
    if (spacing > 0.1) {
      const newSpacing = Math.max(spacing - 0.01, 0);
      setSpacing(newSpacing);
    }
  });

  const tileSize = 1;
  const rows = 8;
  const cols = 8;
  const boardWidth = tileSize * cols;
  const boardHeight = tileSize * rows;

  const setActiveTile = (x, y) => {
    let position = [x, y];
    props?.selection(position);
    setLocation({ ...location, tileX: x, tileY: y });
    currentMotion.current = { ...currentMotion.current, tileX: x, tileY: y };
    setActiveX(x);
    props.x(x);
    props.y(y);
    setActiveY(y);
  };

  const setActivePiece = (x, y) => {
    setLocation({ ...location, pieceX: x, pieceY: y });
    currentMotion.current = { ...currentMotion.current, pieceX: x, pieceY: y };
    setActivePieceX(x);
    setActivePieceY(y);
  };

  useEffect(() => {
    // console.log(currentMotion.current);
  }, [currentMotion.current]);

  const movePiece = (x, y) => {
    if (activeX !== null && activeY !== null) {
      setActivePieceX(activeX);
      setActivePieceY(activeY);
      setActiveX(x);
      setActiveY(y);
    }
  };
  const setCoordinate = (value) => {
    props.selectedCordinate(value);
  };
  const createTile = (x, y) => {
    const isActive = x === activeX && y === activeY;
    const pieceX = isActive ? activePieceX : x;
    const pieceY = isActive ? activePieceY : y;

    return (
      <Tile
        key={`${x}-${y}`}
        x={x}
        y={y}
        tileSize={tileSize}
        spacing={spacing}
        boardWidth={boardWidth}
        boardHeight={boardHeight}
        activeX={activeX}
        activeY={activeY}
        setActiveTile={setActiveTile}
        setActivePiece={setActivePiece}
        pieceX={pieceX}
        pieceY={pieceY}
        changeLocation={currentMotion.current}
        color1={color1}
        color2={color2}
        coordinate={setCoordinate}
      />
    );
  };

  const createBoard = () => {
    const tiles = [];
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        tiles.push(createTile(x, y));
      }
    }
    return tiles;
  };

  return (
    <>

<ambientLight intensity={0.2} />
        <pointLight ref={bulbLightRef} intensity={1} distance={100} decay={2} color={0xffee88} />
        <hemisphereLight ref={hemiLightRef} intensity={0.02} skyColor={0xddeeff} groundColor={0x0f0e0d} />





      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <group ref={ref} rotation={[-3.15, 0, 0.0]} position={[0.29, -0.29, 0]}>
        {createBoard()}
        {/* <group
          position={[
            -boardWidth / 2 + tileSize / 2,
            -boardHeight / 2 + tileSize / 2,
            0.5,
          ]}
        >
          <mesh
            onClick={() => movePiece(activeX, activeY)}
            position={[activeX, activeY, 0]} // Adjust the position of the cube based on activeX and activeY
          >
            <boxBufferGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial color="blue" />
          </mesh>
        </group> */}
      </group>
    </>
  );
};

export default Board;
