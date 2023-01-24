import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      alert(error.message);
    });
  };
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://helios-i.mashable.com/imagery/articles/047UsVLCrupUmmsuitpn1nw/hero-image.fill.size_1248x702.v1623374965.png"
          alt=""
        />
        <h1>Sign In to DOO Slack Clone</h1>
        <p>doo.slack.com</p>

        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  background: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  text-transform: capitalize;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 7px 10px 5px rgba(135, 96, 96, 0.75);
  -webkit-box-shadow: 1px 7px 10px 5px rgba(135, 96, 96, 0.75);
  -moz-box-shadow: 1px 7px 10px 5px rgba(135, 96, 96, 0.75);
  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 10px;
  }
  > button {
    margin-top: 20px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }
`;
