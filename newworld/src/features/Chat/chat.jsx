import React, { useState } from "react";
import style from "./Chat.module.css";
import avathar from "./avathar.png";
const Chat = () => {
  const [openChat, setopenChat] = useState(true);
  const opendetails = () => [setopenChat(!openChat)];
  const [inputValue, setinputValue] = useState("");
  return (
    <div className={style.chatBody}>
      {!openChat && (
        <div className={style.chatButton} onClick={opendetails}>
          <div className={style.chatAvathar}>
            <div className={style.Online}></div>
            <img src={avathar} alt="" srcset="" className={style.avathar} />
          </div>
          <div className={style.chatAvatharDetails}>
            <div>Use Name</div>
            <div>New Message</div>
          </div>
        </div>
      )}

      {openChat && (
        <>
          <div className={style.chatButton} onClick={opendetails}>
            <div className={style.chatAvathar}>
              <div className={style.Online}></div>
              <img src={avathar} alt="" srcset="" className={style.avathar} />
            </div>
            <div className={style.chatAvatharDetails}>
              <div>Use Name</div>
            </div>
          </div>
          <div className={style.chatDetails}>
            <div className={style.chatsection}></div>
            <div className={style.inputBody}>
              <input
                className={style.inputtag}
                type="text"
                name=""
                id=""
                onChange={(e) => {
                  setinputValue(e.target.value);
                }}
                value={inputValue}
              />
              <button className={style.sentButton}>sent</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
