import React from 'react'
import ModelViewer from '../pieceLoader';
import Rook from "../../../assets/images/pieces/black_chess_-_rook.glb"
const RookBlack = ({piecePosition}) => {
    const  RookBlack= { x: 0.01, y: 0.01, z: 0.009, zq: 1 };
    const rotate={x:1.590,y:1.350,z:0}
  return (
    <ModelViewer modelPath={Rook} position={piecePosition} scale={RookBlack} z={RookBlack.zq} rotation={rotate} />
  )
}

export default RookBlack