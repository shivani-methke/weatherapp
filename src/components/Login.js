// src/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import "../LoginSignup.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in");
      setShowMessage(true);
      setMessage("Logged in successfully!");
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      navigate("/");
    } catch (error) {
      console.error("Error logging in", error);
      setShowMessage(true);
      setMessage(`Error: ${error.message}`);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("User logged in with Google");
      setShowMessage(true);
      setMessage("Logged in successfully!");
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      navigate("/");
    } catch (error) {
      console.error("Error logging in with Google", error);
      setShowMessage(true);
      setMessage(`Error: ${error.message}`);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  return (
    <div>
      <h2 className="Login1">Login Here</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {showMessage && <p className="message">{message}</p>}
      <button onClick={handleGoogleLogin} className="google-login-button">
        <i className="fab fa-google"></i> Login with Google
      </button>
    </div>
  );
};

export default Login;
