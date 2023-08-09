import React from 'react'
import ModelViewer from '../pieceLoader'
import queen  from "../../../assets/images/pieces/chess_piece_queen.glb"
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const QueenWhite = ({piecePosition,name}) => {
    const QueenScale={x:0.19,y:0.19,z:0.19,zq:0}
    const gltf = useLoader(GLTFLoader, queen);
  return (
    <>
       <ModelViewer name={name} modelPath={queen} position={piecePosition} scale={QueenScale} z={QueenScale.zq} gltf={gltf} key={piecePosition} />
    </>
  )
}

export default QueenWhite
