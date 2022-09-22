import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleName = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }

    try {
      axios.post("http://localhost:8800/api/auth/register", {
        username,
        password,
        email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <div>User {username} successfully registered !!</div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <div>Please fill all the fields</div>
      </div>
    );
  };

  const navigate = useNavigate();

  const handleToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register">
      <div className="lContainer">
        <input
          type="email"
          className="lInput"
          onChange={handleEmail}
          id="email"
          placeholder="email"
          value={email}
        />
        <input
          type="text"
          className="lInput"
          onChange={handleName}
          id="username"
          placeholder="username"
          value={username}
        />
        <input
          type="password"
          className="lInput"
          onChange={handlePassword}
          value={password}
          id="password"
          placeholder="password"
        />
        <button className="lButton" onClick={handleSubmit}>
          Register
        </button>
        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>
        <div className="toRegister">Already registered ?</div>{" "}
        <button className="rButton" onClick={handleToLogin}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Register;
