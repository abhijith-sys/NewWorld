import React from 'react'
import ModelViewer from '../pieceLoader';
import Queen from "../../../assets/images/pieces/queen_lp_black.glb"
const QueenBlack = ({piecePosition}) => {
    const  QueenBlack= { x: 0.19, y: 0.19, z: 0.19, zq: 0 };
  return (
    <ModelViewer
      modelPath={Queen}
      position={ piecePosition}
      scale={QueenBlack}
      z={QueenBlack.zq}
    />
  )
}

export default QueenBlack
