import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "../LoginSignup.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up");
      setShowMessage(true);
      setMessage("Signed up successfully!");
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      navigate("/"); 
    } catch (error) {
      console.error("Error signing up:", error);
      setShowMessage(true);
      setMessage(`Error: ${error.message}`);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  return (
    <div>
      <h2 className="Login1">Sign Up Here</h2>
      <form onSubmit={handleSignUp}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
      {showMessage && <p className="message">{message}</p>}
    </div>
  );
};

export default SignUp;
