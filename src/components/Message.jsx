import React from "react";
import styled from "styled-components";

const Message = ({ message, timeStamp, user, userImage }) => {
  return (
    <MessageContainer>
      <img src={userImage} alt="user" />
      <MessageInfoContainer>
        <h4>
          {user}
          <span>{timeStamp}</span>
        </h4>
        <p>{message} </p>
      </MessageInfoContainer>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  > img {
    height: 70px;
    width: 70px;
    border-radius: 10px;
    object-fit: contain;
  }
`;
const MessageInfoContainer = styled.div`
  padding-left: 10px;

  > h4 > span {
    color: gray;
    font-weight: 300;
    font-size: 10px;
    margin-left: 4px;
  }
`;
