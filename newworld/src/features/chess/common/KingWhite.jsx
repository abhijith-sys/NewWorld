import React from 'react'
import ModelViewer from '../pieceLoader'
import King from "../../../assets/images/pieces/chess_king.glb"
const KingWhite = ({piecePosition}) => {
    const  KingWHite= { x: 0.05, y: 0.05, z:0.05, zq: 0 };
  return (
    <ModelViewer
      modelPath={King}
      position={piecePosition}
      scale={KingWHite}
      z={KingWHite.zq}
    />
  )
}

export default KingWhite
