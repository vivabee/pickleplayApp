/* import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword } from "../../../database/write";
import "./Register.scss";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      if (!name || !email || !password) {
        throw new Error("Please enter your name, email, and password.");
      }
      await registerWithEmailAndPassword(name, email, password);
      navigate("/createsession"); // Navigate to '/dashboard' route
    } catch (error) {
      alert(error.message); // Display error message to the user
    }
  };

  return (

    <div className="register-container">
    <h3>Register</h3>
    <div className="register">
      <div className="register__container">
        <form onSubmit={register}>
          <input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit" className="register__btn">
            Register
          </button>
        </form>
        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
    </div>
  );
}

export default Register;
 */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword } from "../../../database/write";
import "./Register.scss";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      if (!name || !email || !password) {
        throw new Error("Please enter your name, email, and password.");
      }
      await registerWithEmailAndPassword(name, email, password);
      // If registration is successful, navigate to '/createsession' route
      navigate("/createsession");
    } catch (error) {
      // Display error message to the user
      setErrorMessage(error.message);
      navigate("/login");
    }
  };

  return (
    <div className="register-container">
      <h3>Register</h3>
      <div className="register">
        <div className="register__container">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <form onSubmit={register}>
            <input
              type="text"
              className="register__textBox"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
            <input
              type="text"
              className="register__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
            <input
              type="password"
              className="register__textBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit" className="register__btn">
              Register
            </button>
          </form>
          <div>
            Already have an account? <Link to="/login">Login</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

