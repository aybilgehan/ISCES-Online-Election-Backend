import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from 'react-router-dom';

const SideBar = () => {
    const authCtx = useContext(AuthContext);

    return (
        <div>
            <img src="https://iyte.edu.tr/wp-content/uploads/2019/02/iyte-logo-transparan-360px.png" alt="IYTE Logo" />
            <Link to="/election">
                <button>Home</button>
            </Link>
            <Link to="/candidates">
                <button>Candidates</button>
            </Link>
            <button>Council</button>
            {authCtx.isLoggedIn ?
                <div>
                    <button>My Profile</button>
                    <button onClick={authCtx.onLogout}>Logout</button>
                </div>:
                <Link to="/login"><button>Login</button></Link>
            }
        </div>
    );
};

export default SideBar;
