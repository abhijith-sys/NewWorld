import React from 'react'
import ModelViewer from '../pieceLoader';
import Knight from "../../../assets/images/pieces/chess_knight_white_blue.glb"
const KnightWhite = ({piecePosition}) => {
    const  KnightWhite= { x: 3, y: 3, z: 3, zq: 0 };
  return (
    <ModelViewer
    modelPath={Knight}
    position={piecePosition}
    scale={KnightWhite}
    z={KnightWhite.zq}
  />
  )
}

export default KnightWhite
