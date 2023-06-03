import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link, Outlet } from "react-router-dom";
import "./SideBar.css";
const SideBar = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div className="page-layout-container">
      <div className="sidebar-container">
        <div className="navigation-bar">
          <Link className="option" to="/">
            <div>
              <ion-icon name="home-outline"></ion-icon>
              <button>Home</button>
            </div>
          </Link>
          <Link className="option" to="/candidateapproval">
            {authCtx.userRole == "officer" && (
              <div>
                <ion-icon name="calendar-outline"></ion-icon>
                <button>Candidate Approval</button>
              </div>
            )}
          </Link>
          <Link className="option" to="/election">
            <div>
              <ion-icon name="pie-chart-outline"></ion-icon>
              <button>Election</button>
            </div>
          </Link>
          <Link className="option" to="/setelectiondate">
            {authCtx.userRole == "rector" && (
              <div>
                <ion-icon name="calendar-outline"></ion-icon>
                <button>Set Election Date</button>
              </div>
            )}
          </Link>
          <Link className="option" to="/candidates">
            {(authCtx.userRole === "student" ||
              authCtx.userRole === "candidate") && (
              <div>
                <ion-icon name="shield-checkmark-outline"></ion-icon>
                <button>Vote</button>
              </div>
            )}
          </Link>
          <Link className="option" to="/council">
            {(authCtx.userRole === "student" ||
              authCtx.userRole === "candidate") && (
              <div>
                <ion-icon name="people-outline"></ion-icon>
                <button>Council</button>
              </div>
            )}
          </Link>
          <Link className="option" to="/candidateform">
            {(authCtx.userRole === "student" ||
              authCtx.userRole === "candidate") && (
              <div>
                <ion-icon name="document-attach-outline"></ion-icon>
                <button>Be candidate</button>
              </div>
            )}
          </Link>
          <Link className="option" to="/profile">
            <div>
              <ion-icon name="person-circle-outline"></ion-icon>
              <button>Profile</button>
            </div>
          </Link>
          <Link className="option" to="/">
            <div>
              <ion-icon name="exit-outline"></ion-icon>
              <button onClick={authCtx.exitHandler}>LogOut</button>
            </div>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SideBar;
