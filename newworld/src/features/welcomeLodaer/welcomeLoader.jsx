import React from "react";
import style from "./welcomeLoader.module.css";
import { Canvas } from "react-three-fiber";
import Loader from "./Loader/Loader";
import ModelViewer from "./Loader/testPieces";
import queen from "../../assets/images/pieces/chess_piece_queen.glb";
const WelcomeLoader = () => {
  const qposiiton = { x: 0, y: 0, z: 0 };
  return (
    <div className={style.wBody}>
      <Canvas>
        {/* <Loader/> */}
        <ModelViewer modelPath={queen} position={qposiiton} />
      </Canvas>
    </div>
  );
};

export default WelcomeLoader;
