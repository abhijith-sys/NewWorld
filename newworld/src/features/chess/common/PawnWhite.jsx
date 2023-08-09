import React from 'react'
import Pawn from "../../../assets/images/pieces/chess_pawn_white.glb"
import ModelViewer from '../pieceLoader';

const PawnWhite = ({piecePosition}) => {
    const  PawnWhite= { x: 0.19, y: 0.19, z: 0.19, zq: 0 };
  return (
    <ModelViewer
      modelPath={Pawn}
      position={ piecePosition }
      scale={PawnWhite}
      z={PawnWhite.zq}
    />
  )
}

export default PawnWhite
