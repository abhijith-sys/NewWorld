import React, { useRef } from "react";
import chessstyle from "./chess.module.css";
import { Canvas } from "react-three-fiber";
import Board from "./Board";
const Chess = () => {
  return (
    <div className={chessstyle.chessBody}>
      <Canvas>
        <Board />
      </Canvas>
    </div>
  );
};

export default Chess;
