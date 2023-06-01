import React, { useRef, useEffect, useState } from "react";
import { useThree, extend, useFrame } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Tile from "./Tile";
extend({ OrbitControls });

const Board = () => {
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

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.zoomSpeed = 0.8;
    camera.position.set(0, 0, 10);

    controls.update();
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
    setLocation({ ...location, tileX: x, tileY: y });
    currentMotion.current = { ...currentMotion.current, tileX: x, tileY: y };
    setActiveX(x);
    setActiveY(y);
  };

  const setActivePiece = (x, y) => {
    setLocation({ ...location, pieceX: x, pieceY: y });
    currentMotion.current = { ...currentMotion.current, pieceX: x, pieceY: y };
    setActivePieceX(x);
    setActivePieceY(y);
  };

  useEffect(() => {
    console.log(currentMotion.current);
  }, [currentMotion.current]);

  const movePiece = (x, y) => {
    if (activeX !== null && activeY !== null) {
      setActivePieceX(activeX);
      setActivePieceY(activeY);
      setActiveX(x);
      setActiveY(y);
    }
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
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <group ref={ref}>
        {createBoard()}
        <group
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
        </group>
      </group>
    </>
  );
};

export default Board;
