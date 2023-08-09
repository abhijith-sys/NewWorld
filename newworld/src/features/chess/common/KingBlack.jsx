import React from 'react'
import ModelViewer from '../pieceLoader'
import King from "../../../assets/images/pieces/finished_chess_piece_the_king1_black.glb"
const KingBlack = ({piecePosition}) => {
   const  KingBlack= { x:.2, y: .2, z: .2, zq: 0.3 };
   return (
    <>
    <ModelViewer
      modelPath={King}
      position={piecePosition}
      scale={KingBlack}
      z={KingBlack.zq}
    />
  </>
  )
}

export default KingBlack
