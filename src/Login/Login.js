import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { auth, provider } from "../firebase";
import "./Login.css";
function Login() {
  const [acc, setAcc] = useState(true);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) =>
        response.user.updateProfile({
          displayName: userName,
        })
      )
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };

  const googleLogin = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt=""
      />
      <div className="login__info">
        {acc ? (
          <>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="Email"
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="Password"
            />
            <Button className="btn__login" onClick={handleLogin}>
              Log in
            </Button>
            <Button className="btn__noaccount" onClick={() => setAcc(false)}>
              do not have an account
            </Button>
          </>
        ) : (
          <>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="Email"
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="Password"
            />
            <TextField
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              label="Username"
            />
            <Button className="btn__register" onClick={handleRegister}>
              register
            </Button>
            <Button className="btn__noaccount" onClick={() => setAcc(true)}>
              back
            </Button>
          </>
        )}
        <hr />
        <p>OR</p>
        <Button className="btn__google" onClick={googleLogin}>
          Login with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
