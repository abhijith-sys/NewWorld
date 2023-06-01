import React, { useEffect, useRef, useState } from "react";
import terminalstyle from "./terminal.module.css";
import { SHA256 } from "crypto-js";
import Chess from "../chess/chess";
import ChessDashboard from "../../pages/chessDashboard";

const TerminalComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const localHash = localStorage.getItem("hashcode");
  const [hashcode, setHashcode] = useState(localHash ? localHash : "");
  const [chessStaus, setchessStaus] = useState(false);
  const inputRef = useRef(null);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      const hashedValue = SHA256(inputValue).toString();
      setHashcode(hashedValue);
      localStorage.setItem("hashcode", hashedValue);
      setInputValue("");
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (hashcode === process.env.REACT_APP_CHESS_ID) {
      setchessStaus(true);
    }
  }, [hashcode]);

  return (
    <>
      {!chessStaus && (
        <div className={terminalstyle.terminalBody}>
          <p>Welcome to the Terminal</p>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleEnterKeyPress}
            style={{
              backgroundColor: "transparent",
              color: "green",
              border: "none",
              outline: "none",
              width: "100%",
              paddingTop: "50px",
            }}
          />
        </div>
      )}
      {chessStaus && <ChessDashboard />}
    </>
  );
};

export default TerminalComponent;
