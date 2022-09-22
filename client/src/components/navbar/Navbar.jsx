import "./navbar.css";
import { AuthContext } from "../../context/AuthContext.js";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const handleClick = () => {
    dispatch({ type: "LOGOUT" });
  };
  const handleToLogin = () => {
    navigate("/login");
  };
  const handleToRegister = () => {
    navigate("/register");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SleepWell</span>
        </Link>

        {user ? (
          <div>
            Hello <span className="userName">{user.username}</span>
            <button onClick={handleClick} className="navButton">
              Log out
            </button>
            
            
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={handleToRegister}>
              Register
            </button>
            <button className="navButton" onClick={handleToLogin}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
