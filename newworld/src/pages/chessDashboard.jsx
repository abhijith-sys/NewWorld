import React from "react";
import style from "./chessDashboard.module.css";
import GroupChat from "../features/groupChat/GroupChat";
import Chess from "../features/chess/chess";
import WelcomeLoader from "../features/welcomeLodaer/welcomeLoader";

function ChessDashboard() {
  return (
    <>
      <div >

      <Chess />
        {/* <div className={style.chessBody}>
        
            <Chess />
       <WelcomeLoader/>
        </div>
        <div className={style.chatBody}>
          <GroupChat />
        </div> */}
      </div>
    </>
  );
}

export default ChessDashboard;
