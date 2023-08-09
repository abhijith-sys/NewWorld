import React, { useEffect, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import QueenWhite from "./common/QueenWhite";
import QueenWhite from "../../assets/images/pieces/chess_piece_queen.glb";

// import RookWhite from "./common/RookWhite";
import RookWhite from "../../assets/images/pieces/Rook.glb";

// import RookBlack from "./common/RookBlack";
import RookBlack from "../../assets/images/pieces/r.glb";

// import KingBlack from "./common/KingBlack";
import KingBlack from "../../assets/images/pieces/finished_chess_piece_the_king1_black.glb";

// import KnightWhite from "./common/KnightWhite";
import KnightWhite from "../../assets/images/pieces/N.glb";

// import KingWhite from "./common/KingWhite";
import KingWhite from "../../assets/images/pieces/K.glb";

// import KnightBlack from "./common/KnightBlack";
import KnightBlack from "../../assets/images/pieces/chess_piece_knight_horse_black.glb";

// import QueenBlack from "./common/QueenBlack";
import QueenBlack from "../../assets/images/pieces/queen_lp_black.glb";

// import BishopBlack from "./common/BishopBlack";
import BishopBlack from "../../assets/images/pieces/newBishopBlack.glb";

// import BishopWhite from "./common/BishopWhite";
import BishopWhite from "../../assets/images/pieces/BB.glb";

// import PawnWhite from "./common/PawnWhite";
import PawnWhite from "../../assets/images/pieces/chess_pawn_white.glb";

// import PawnBlack from "./common/PawnBlack";
import PawnBlack from "../../assets/images/pieces/pawn_chess_piece.glb";

import center from "../../constants/center.json";
const LoadPieces = (props) => {
  const { position } = props;

  const gltfQueenWhite = useLoader(GLTFLoader, QueenWhite);
  const gltfRookWhite = useLoader(GLTFLoader, RookWhite);
  const gltfRookBlack = useLoader(GLTFLoader, RookBlack);
  const gltfKingBlack = useLoader(GLTFLoader, KingBlack);
  const gltfKingWhite = useLoader(GLTFLoader, KingWhite);
  const gltfKnightWhite = useLoader(GLTFLoader, KnightWhite);
  const gltfKnightBlack = useLoader(GLTFLoader, KnightBlack);
  const gltfQueenBlack = useLoader(GLTFLoader, QueenBlack);
  const gltfBishopBlack = useLoader(GLTFLoader, BishopBlack);
  const gltfBishopWhite = useLoader(GLTFLoader, BishopWhite);
  const gltfPawnWhite = useLoader(GLTFLoader, PawnWhite);
  const gltfPawnBlack = useLoader(GLTFLoader, PawnBlack);

  const [allPieces, setAllPieces] = useState([]);

  const pieceScale = {
    p: { x: 0.19, y: 0.19, z: 0.19, zq: 0.39 },
    P: { x: 0.19, y: 0.19, z: 0.19, zq: 0 },
    Q:{x:0.17,y:0.13,z:0.16,zq:0},
    K:{x:0.18,y:0.16,z:0.19},
    N:{x:3,y:3,z:3,zq:0.01,rY:3.310},
    B:{x:.15,y:.15,z:.15,zq:0,rY:0},
    n:{x: 0.1, y: 0.1, z: 0.1, zq: -0.1 },
    r:{x: 15, y: 15, z: 15, zq: -0.1 },
    b:{ x: 0.008, y: 0.008, z:0.008, zq:-0.07,rX:0,rY:0,rZ:0 },
    q:{x: 0.16, y: 0.18, z:0.14, zq:-0.09,rX:0,rY:0,rZ:0 }

  };

  //get the position of the pieces
  // const pieceConfiguration = {
  //   // e1: "K"
  //   // h1: "R"
  //   // d1: "Q",
  //   // e1: "K",
  //   // b1: "N", 
  //   // c1: "N",
  //   // f1: "B",
  //   // c1: "B",
  //   // a7: "p",
  //   // b7: "p",
  //   // c7: "p",
  //   // d7: "p",
    // e7: "p",
  //   // f7: "p",
  //   // g7: "p",
  //   // h7: "p",
  //   // a2: "P",
  //   // b2: "P",
  //   // c2: "P",
  //   // d2: "P",
  //   // e2: "P",
  //   // f2: "P",
  //   // g2: "P",
  //   // h2: "P",
  // };
  const pieceConfiguration = {
    a8: "r", // Black Rook on a8
    b8: "n", // Black Knight on b8
    c8: "b", // Black Bishop on c8
    d8: "q", // Black Queen on d8
    e8: "k", // Black King on e8
    f8: "b", // Black Bishop on f8
    g8: "n", // Black Knight on g8
    h8: "r", // Black Rook on h8
    a7: "p", // Black Pawn on a7
    b7: "p", // Black Pawn on b7
    c7: "p", // Black Pawn on c7
    d7: "p", // Black Pawn on d7
    e7: "p", // Black Pawn on e7
    f7: "p", // Black Pawn on f7
    g7: "p", // Black Pawn on g7
    h7: "p", // Black Pawn on h7
    a2: "P", // White Pawn on a2
    b2: "P", // White Pawn on b2
    c2: "P", // White Pawn on c2
    d2: "P", // White Pawn on d2
    e2: "P", // White Pawn on e2
    f2: "P", // White Pawn on f2
    g2: "P", // White Pawn on g2
    h2: "P", // White Pawn on h2
    a1: "R", // White Rook on a1
    b1: "N", // White Knight on b1
    c1: "B", // White Bishop on c1
    d1: "Q", // White Queen on d1
    e1: "K", // White King on e1
    f1: "B", // White Bishop on f1
    g1: "N", // White Knight on g1
    h1: "R", // White Rook on h1
  };

  const generatePieces = (pieceConfiguration) => {
    const components = [];

    for (const position in pieceConfiguration) {
      const piece = pieceConfiguration[position];
      const piecePosition = center[position];

      if (piece) {
        let component;

        switch (piece) {
          case "Q":
            component = createCopy(gltfQueenWhite, piecePosition,pieceScale.Q);
            break;
          case "q":
            component = createCopy(gltfQueenBlack, piecePosition,pieceScale.q);
            break;
          case "R":
            component = createCopy(gltfRookWhite, piecePosition);
            break;
          case "r":
            component = createCopy(gltfRookBlack, piecePosition,pieceScale.r);
            break;
          case "N":
            component = createCopy(gltfKnightWhite, piecePosition,pieceScale.N);
            break;
          case "n":
            component = createCopy(gltfKnightBlack, piecePosition,pieceScale.n);
            break;
          case "K":
            component = createCopy(gltfKingWhite, piecePosition, pieceScale.K);
            break;
          case "k":
            component = createCopy(gltfKingBlack, piecePosition);
            break;
          case "B":
            component = createCopy(gltfBishopWhite, piecePosition,pieceScale.B);
            break;
          case "b":
            component = createCopy(gltfBishopBlack, piecePosition,pieceScale.b);
            break;
          case "P":
            component = createCopy(gltfPawnWhite, piecePosition, pieceScale.P);
            break;
          case "p":
            component = createCopy(gltfPawnBlack, piecePosition, pieceScale.p);

            break;
          default:
            component = null;
            break;
        }
        if (component) {
          components.push(component);
        }
      }
    }

    console.log(components);
    setAllPieces(components);
    return components;
  };

  const createCopy = (gltf, position, scale) => {
    const { scene } = gltf;
    const clonedScene = scene.clone();
    clonedScene.position.set(
      position?.x || 0,
      position?.y || 0,
      scale?.zq || 0.19
    );
    clonedScene.scale.set(scale?.x || 0.19, scale?.y || 0.19, scale?.z || 0.19);
    clonedScene.rotation.set(1.5, scale?.rY||0, 0);
    return clonedScene;
  };

  useEffect(() => {
    let data = generatePieces(pieceConfiguration);

    console.log(data);
  }, []);

  return (
    <>
      {allPieces.map((instance, index) => (
        <primitive object={instance} key={index} />
      ))}
    </>
  );
};

export default LoadPieces;
