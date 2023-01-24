import { InfoOutlined, StarBorderOutlined } from "@mui/icons-material";
import { collection, doc, orderBy, query } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectRoomId } from "../features/appSlice";
import { db } from "../firebase";
import ChatInput from "./ChatInput";
import Message from "./Message";

const Chat = () => {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(roomId && doc(db, "rooms", `${roomId}`));
  const [roomMessages, loading] = useCollection(
    roomId &&
      query(
        collection(db, `rooms/${roomId}/messages`),
        orderBy("timestamp", "asc")
      )
  );
  useEffect(() => {
    if (chatRef && chatRef.current) {
      return chatRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // chatRef && chatRef.current
    //   ? chatRef.current.scrollIntoView({ behavior: "smooth" })
    //   : null;
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>
                  # {roomDetails ? roomDetails.data().name : "Room Name"}
                </strong>
              </h4>
              <StarBorderOutlined />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlined /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages
              ? roomMessages.docs.map((doc) => {
                  const { message, timestamp, user, userImage } = doc.data();
                  return (
                    <Message
                      key={doc.id}
                      message={message}
                      timeStamp={
                        timestamp ? timestamp.toDate().toString() : null
                      }
                      user={user}
                      userImage={userImage}
                    />
                  );
                })
              : null}
            <ChatBottom ref={chatRef} />
          </ChatMessages>

          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails ? roomDetails.data().name : `# ROOM`}
            channelId={roomId}
          />
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow: scroll;
  margin-top: 60px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;
const ChatMessages = styled.div``;
const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
