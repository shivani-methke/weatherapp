import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
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
      console.error("Error logging in:", error);
      setShowMessage(true);
      setMessage(`Error: ${error.message}`);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {showMessage && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
