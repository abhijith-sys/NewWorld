import React from 'react'
import Knight from "../../../assets/images/pieces/chess_piece_knight_horse_black.glb"
import ModelViewer from '../pieceLoader';
const KnightBlack = ({piecePosition}) => {
    const  KnightBlack= { x:.1, y: .1, z: .1, zq: 0 };
  return (
    <>
         <ModelViewer
      modelPath={Knight}
      position={piecePosition}
      scale={KnightBlack}
      z={KnightBlack.zq}
    />
    </>
  )
}

export default KnightBlack
