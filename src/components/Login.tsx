import React from "react";
import Button from "@mui/material/Button";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from "../Firebase";

interface LoginProps {
  isLogin: boolean;
}

const Login = (props: LoginProps): JSX.Element => {
  type Provider = GoogleAuthProvider;
  const handleLogin = (provider: Provider): void => {
    void (async () => {
      await signInWithPopup(auth, provider);
    })();
  };

  return (
    <>
      {props.isLogin ? (
        <Button
          variant="contained"
          onClick={() => {
            void signOut(auth);
          }}
        >
          sign out
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            handleLogin(googleAuthProvider);
          }}
        >
          login with google
        </Button>
      )}
    </>
  );
};
export default Login;
