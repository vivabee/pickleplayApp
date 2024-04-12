import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../database/config';
import "./Login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        throw new Error("Please enter your email and password.");
      }

      await signInWithEmailAndPassword(auth, email, password);
      navigate("/sessions");
    } catch (error) {
      alert(error.message);
    }
  };



  return (
    <div className="login-container">
      <h3>Login to Your Account</h3>
      <div className="login">
        <div className="login-container">
          <input
            type="text"
            className="login-textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="login-textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}


