import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from 'react-router-dom';
import "./SideBar.css";
const SideBar = (props) => {
    const authCtx = useContext(AuthContext);
    return (
        <div className="container">
          <Link to="/home">
            <button>Main Page</button>
          </Link>
          <Link to="/election">
            <button>Election</button>
          </Link>
          <Link to="/candidates">
            <button>Candidates</button>
          </Link>
          <Link to="/council">
            <button>Council</button>
          </Link>
          <Link to="/candidateform">
            <button>Be candidate</button>
          </Link>
          <Link to="/">
            <button onClick={props.changeLoggedInStatus}>LogOut</button>
          </Link>
        </div>
      );
      
};

export default SideBar;
