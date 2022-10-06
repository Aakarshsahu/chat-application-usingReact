import React, { useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { async } from "@firebase/util";

export default function Chat({ userName }) {
  const { groupId } = useParams();
  const [groupName, setGroupName] = useState();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(groupId);
    if (groupId) {
      const getGroup = onSnapshot(doc(db, "groups", groupId), (doc) => {
        setGroupName(doc.data().name);
      });

      const q = query(
        collection(db, "groups", groupId, "messages"),
        orderBy("timestamp", "asc")
      );
      const getMessage = onSnapshot(q, (snapshot) => {
        let msgList = [];
        snapshot.docs.forEach((doc) => {
          msgList.push({ ...doc.data() });
        });
        setMessages(msgList);
        console.log(messages);
      });
    }
  }, [groupId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input == "") {
      return alert("Please enter your message");
    }
    {
      try {
        const sendData = await addDoc(
          collection(db, "groups", groupId, "messages"),
          {
            message: input,
            name: userName,
            timestamp: serverTimestamp(),
          }
        );
      } catch (e) {
        console.error("error", e);
      }
      setInput("");
    }
  };

  return (
    <div className="chat">
      {/* --------------------------Chat Header -----------------------*/}
      <div className="chatHeader">
        <img
          src="https://cdn-icons-png.flaticon.com/128/4333/4333609.png"
          alt=""
        />
        <div className="chatHeaderInfo">
          <h3>{groupName}</h3>
          <p>
            Last seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chatHeaderRight">
          <button style={{ border: "none" }}>
            <span className="material-symbols-outlined">search</span>
          </button>
          <button style={{ border: "none" }}>
            <span className="material-symbols-outlined">attach_file</span>
          </button>
          <button style={{ border: "none" }}>
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </div>
      {/*--------------------- Chat Body---------------------------- */}
      <div className="chatBody">
        {messages.map((message) => (
          <p
            className={`chatMessage ${message.name == userName && "chatReceiver"
              }`}
          >
            <span className="chatName">{message.name}</span>
            {message.message}
            <span className="timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      {/* -------------------------chat footer------------------------- */}
      <div className="chatFooter">
        <span className="material-symbols-outlined">mood</span>
        <form
          onSubmit={(e) => {
            sendMessage(e);
          }}
        >
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" style={{ border: "none" }}>
            <span className="material-symbols-outlined">send</span>
          </button>
          <button style={{ border: "none" }}>
            <span className="material-symbols-outlined">mic</span>
          </button>
        </form>
      </div>
    </div>
  );
}
