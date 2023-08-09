import React, { useEffect, useState } from "react";
import QueenWhite from "./common/QueenWhite";
import RookWhite from "./common/RookWhite";
import RookBlack from "./common/RookBlack";
import KingBlack from "./common/KingBlack";
import KnightWhite from "./common/KnightWhite";
import KingWhite from "./common/KingWhite";
import KnightBlack from "./common/KnightBlack";
import QueenBlack from "./common/QueenBlack";
import BishopBlack from "./common/BishopBlack";
import BishopWhite from "./common/BishopWhite";
import PawnWhite from "./common/PawnWhite";
import PawnBlack from "./common/PawnBlack";
import center from "../../constants/center.json";
const Pieces = (props) => {
  const { x, y, coordinates } = props;
  const [allPieces, setAllPieces] = useState([]);

  const [piecePosition, setpiecePosition] = useState({ x: x, y: y, z: 0 });
  useEffect(() => {
    setpiecePosition({ x: x, y: y, z: 0 });
  }, [coordinates, x, y]);

  const generateChessComponents = (pieceConfiguration) => {
    const components = [];

    for (const position in pieceConfiguration) {
      const piece = pieceConfiguration[position];
      const piecePosition = center[position];

      if (piece) {
        let component;

        switch (piece) {
          case "Q":
            component = (
              <QueenWhite piecePosition={piecePosition} key={position} />
            );
            break;
          case "q":
            component = (
              <QueenBlack piecePosition={piecePosition} key={position} />
            );
            break;
          case "R":
            component = (
              <RookWhite piecePosition={piecePosition} key={position} />
            );
            break;
          case "r":
            component = (
              <RookBlack piecePosition={piecePosition} key={position} />
            );
            break;
          case "N":
            component = (
              <KnightWhite piecePosition={piecePosition} key={position} />
            );
            break;
          case "n":
            component = (
              <KnightBlack piecePosition={piecePosition} key={position} />
            );
            break;
          case "K":
            component = (
              <KingWhite piecePosition={piecePosition} key={position} />
            );
            break;
          case "k":
            component = (
              <KingBlack piecePosition={piecePosition} key={position} />
            );
            break;
          case "B":
            component = (
              <BishopWhite piecePosition={piecePosition} key={position} />
            );
            break;
          case "b":
            component = (
              <BishopBlack piecePosition={piecePosition} key={position} />
            );
            break;
          case "P":
            component = (
              <PawnWhite piecePosition={piecePosition} key={position} />
            );
            break;
          case "p":
            component = (
              <PawnBlack piecePosition={piecePosition} key={position} />
            );
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

    return components;
  };

  const pieceConfiguration = {
    a7: "p",
    b7: "p",
    c7: "p",
    d7: "p",
    e7: "p",
    f7: "p",
    g7: "p",
    h7: "p",
    a2: "P",
    b2: "P",
    c2: "P",
    d2: "P",
    e2: "P",
    f2: "P",
    g2: "P",
    h2: "P",
  };

  //  generateChessComponents(pieceConfiguration);

  return (
    <>
      {/* <ModelViewer modelPath={queen} position={piecePosition} scale={QueenScale} z={QueenScale.zq} /> */}
      {/* <RookWhite piecePosition={piecePosition} /> */}
      {/* <QueenWhite piecePosition={piecePosition} />
      <QueenBlack piecePosition={piecePosition} />

      
      <RookBlack piecePosition={piecePosition} />

      <KnightWhite piecePosition={piecePosition} />
      <KnightBlack piecePosition={piecePosition} />

      <KingWhite piecePosition={piecePosition} />
      <KingBlack piecePosition={piecePosition} />

      <BishopBlack piecePosition={piecePosition} />
      <BishopWhite piecePosition={piecePosition} />

      <PawnBlack piecePosition={piecePosition} />
      <PawnWhite piecePosition={piecePosition} /> */}
      {/* {generateChessComponents(pieceConfiguration)} */}

      {/* <QueenWhite piecePosition={{ x: -3.29, y: -4.36 ,z:0}} key={1} name={"queen1"} /> */}
      {/* <QueenWhite piecePosition={{ x: -3.29, y: -3.29,z:0 }} key={2} name={"queen2"}  /> */}

      {/* <QueenWhite piecePosition={{ x: -3.29, y: -4.36 ,z:0}} key={1} /> */}
      {/* <PawnWhite piecePosition={ { x: -3.29, y: -4.36 ,z:0}} key={2} /> */}

    </>
  );
};

export default Pieces;
