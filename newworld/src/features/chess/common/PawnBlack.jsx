import React from "react";
import Pawn from "../../../assets/images/pieces/pawn_chess_piece.glb";
import ModelViewer from "../pieceLoader";
const PawnBlack = ({ piecePosition }) => {
  const PawnBlack = { x: 0.19, y: 0.19, z: 0.19, zq: .390 };
  return (
    <ModelViewer
      modelPath={Pawn}
      position={ piecePosition }
      scale={PawnBlack}
      z={PawnBlack.zq}
    />
  );
};

export default PawnBlack;
