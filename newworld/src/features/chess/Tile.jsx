import React, { useState } from "react";
import { Box } from "three";

const Tile = ({
  x,
  y,
  tileSize,
  spacing,
  boardWidth,
  boardHeight,
  activeX,
  activeY,
  setActiveTile,
  setActivePiece,
  pieceX,
  pieceY,
  changeLocation,
  color1,
  color2,
  coordinate,
}) => {
  const isActiveTile = activeX === x && activeY === y;

  const [isSelectedTile, setisSelectedTile] = useState(false);
  const [isSelectedPiece, setisSelectedPiece] = useState(false);

  const handleClick = (event) => {
    setActiveTile(x, y);
    // const mesh = event.object;
    // const { x, y, z } = event.point.clone().applyMatrix4(mesh.matrixWorld);

    // console.log(`Clicked position: (${x}, ${y}, ${z})`);
    // console.log(piecePositionX);
    // console.log(piecePositionY);

    setisSelectedTile(!isSelectedTile);
 
    coordinate({ x: piecePositionX, y: piecePositionY, z: 0 });

    // Create a mesh at the center of the clicked tile
    // const centerX = positionX;
    // const centerY = positionY;

    // console.log(centerX,centerY);
  };
  const onPiece = () => {
    setisSelectedPiece(!isSelectedPiece);
    setActivePiece(x, y);
  };
  const positionX =
    x * (tileSize + spacing) - (boardWidth + spacing) / 2 + tileSize / 2;
  const positionY =
    y * (tileSize + spacing) - (boardHeight + spacing) / 2 + tileSize / 2;

  let piecePositionX = positionX;
  let piecePositionY = positionY;

  if (changeLocation?.pieceX === x && changeLocation?.pieceY === y) {
    piecePositionX = changeLocation?.tileX;
    piecePositionY = changeLocation?.tileY;
  }

  let color;
  if (isActiveTile) {
    color = "#00ff00"; // Green color for active tile
  } else {
    color = (x + y) % 2 === 0 ? color1 || "#ffffff" : color2 || "#000000"; // Black and white colors for other tiles
  }

  let pieceColor = null;
  if (y === 1 || y === 0) {
    pieceColor = "#ff0000"; // Red color for initial black pieces
  } else if (y === 6 || y === 7) {
    pieceColor = "#0000ff"; // Blue color for initial white pieces
  }

  return (
    <>
      <mesh position={[positionX, positionY, 0]} onClick={handleClick}>
        <boxGeometry args={[tileSize, tileSize, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 
      {pieceColor && (
        <mesh position={[piecePositionX, piecePositionY, tileSize / 2]} onClick={onPiece}>
          <boxBufferGeometry args={[tileSize / 2, tileSize / 2, tileSize]} />
          <meshBasicMaterial color={pieceColor} />
        </mesh>
      )} */}
    </>
  );

};

export default Tile;
