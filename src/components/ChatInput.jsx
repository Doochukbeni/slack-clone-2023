import { Button } from "@mui/material";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";

const ChatInput = ({ channelName, channelId, chatRef }) => {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!channelId) {
      return false;
    }

    // await setDoc(doc(db, `rooms/${channelId}/messages`, `${channelId}`), {
    //   message: input,
    //   timestamp: serverTimestamp(),
    //   user: "Chukwuma Benjamin",
    //   userImage:
    //     "https://www.facebook.com/photo/?fbid=129571532770774&set=pob.100071537837913",
    // });

    // setInput("");
    // await setDoc doc(db, "rooms", `${channelId}`, "messages");

    //  THIS CODE CREATE A SUB-COLLECTION WITHIN A DOCUMENT
    const newMessage = doc(collection(db, `rooms/${channelId}/messages`));

    await setDoc(newMessage, {
      message: input,
      timestamp: serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });
    chatRef.current.scrollIntoView({
      behavior: "smooth",
    });
    setInput("");
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          type="text"
          placeholder={`messages ${channelName}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" hidden onClick={sendMessage}>
          Send
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }
  > form > button {
    display: none !important;
  }
`;
