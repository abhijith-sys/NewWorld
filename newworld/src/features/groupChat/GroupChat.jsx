import React, { useEffect, useState } from "react";
import style from "./GroupChat.module.css";

import { auth, db } from "../../config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { query, orderBy, onSnapshot, limit } from "firebase/firestore";
import Message from "./messsages/message";
const GroupChat = () => {
  const [inputValue, setinputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const sentMessage = async () => {
    const { uid, displayName, photoURL } = auth.currentUser;
    const data = {
      text: inputValue,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    };
    await addDoc(collection(db, "messages"), data);
    setinputValue("");
  };

  //get data

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    console.log("====================================");
    console.log(messages);
    console.log("====================================");
  }, [messages]);

  return (
    <div className={style.chatBody}>
      {/* <div >
        {messages?.map((message) => (
         <h1>{message}</h1>
        ))}
      </div> */}
      <Message />

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
        <button onClick={sentMessage} className={style.sentButton}>
          sent
        </button>
      </div>
    </div>
  );
};

export default GroupChat;
