import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import "./login.css";

const Login = ({ page }) => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  // Handle credentials change

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Use AuthContext to login

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      if (page === "create") {
        navigate("/create-hotel");
      } else if (page === "delete") {
        navigate("/handle-hotel");
      } else {
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const navigate = useNavigate();

  // Navigate to register page

  const handleToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          className="lInput"
          onChange={handleChange}
          id="username"
          placeholder="username"
        />
        <input
          type="password"
          className="lInput"
          onChange={handleChange}
          id="password"
          placeholder="password"
        />
        <button disabled={loading} className="lButton" onClick={handleClick}>
          Login
        </button>
        {error && <span className="error">{error.message}</span>}
        <div className="toRegister">No account yet ?</div>{" "}
        <button className="rButton" onClick={handleToRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
