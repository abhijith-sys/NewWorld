import React from "react";
import style from "./chessDashboard.module.css";
import GroupChat from "../features/groupChat/GroupChat";
import Chess from "../features/chess/chess";

function ChessDashboard() {
  return (
    <>
      <div className={style.chessDash}>
        <div className={style.chessBody}>
        
            <Chess />
       
        </div>
        <div className={style.chatBody}>{/* <GroupChat /> */}</div>
      </div>
    </>
  );
}

export default ChessDashboard;
