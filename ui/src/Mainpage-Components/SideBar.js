import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./SideBar.css";
const SideBar = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <div className="container">
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/election">
        <button>Election</button>
      </Link>
      <Link to="/setelectiondate">
      {authCtx.userRole == "rector" && <button>Set Election Date</button> }
      </Link>
      <Link to="/candidates">
      {authCtx.userRole == "student" && <button>Candidates</button> }
      </Link>
      <Link to="/council">
        {authCtx.userRole == "student" && <button>Council</button>}
      </Link>
      <Link to="/candidateform">
        {authCtx.userRole == "student" && <button>Be candidate</button>}
      </Link>
      <Link to="/profile">
        {<button>Profile</button>}
      </Link>
      <Link to="/">
        <button onClick={authCtx.exitHandler}>LogOut</button>
      </Link>
    </div>
  );
};

export default SideBar;
