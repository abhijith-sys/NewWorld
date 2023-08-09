import React from "react";
import ModelViewer from "../pieceLoader";
import Bishop from "../../../assets/images/pieces/white_bishop.glb";
const BishopWhite = ({ piecePosition }) => {
  const BishopBlack = { x: 0.19, y: 0.19, z: 0.19, zq: -.41};
  return (
    <>
      <ModelViewer
        modelPath={Bishop}
        position={piecePosition}
        scale={BishopBlack}
        z={BishopBlack.zq}
      />
    </>
  );
};

export default BishopWhite;
