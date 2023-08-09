import React from "react";
import ModelViewer from "../pieceLoader";
import Bishop from "../../../assets/images/pieces/blackl_chess_-_bishop.glb"
const BishopBlack = ({piecePosition}) => {
  const BishopBlack = { x: 0.01, y: 0.01, z: 0.01, zq: .9 };
  const rotate={x:1.590,y:1.350,z:0}
  return (
    <>
      <ModelViewer
        modelPath={Bishop}
        position={piecePosition}
        scale={BishopBlack}
        z={BishopBlack.zq}
        rotation={rotate} 
      />
    </>
  );
};

export default BishopBlack;
