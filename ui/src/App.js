import React from "react";
import Login from "./Pages/Login";
import Candidates from "./Pages/Candidates";
import Election from "./Pages/Election";
import CandidateForm from "./Pages/CandidateForm";
import Council from "./Pages/Council";
import SideBar from "./Mainpage-Components/SideBar";
import Home from "./Pages/Home";
import "./App.css"
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Mainpage-Components/MainPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function loggedInHandler() {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <div className="app-container">
      <img
        src="https://bhib.iyte.edu.tr/wp-content/uploads/sites/115/2018/09/iyte_logo-tur.png"
        style={{ width: '200px', height: 'auto', margin: '0 auto', display: 'block' }}
        alt="IYTE Logo"
      />

      <BrowserRouter>
        <div className="content-container">
          {isLoggedIn && <MainPage changeLoggedInStatus={loggedInHandler} />}
          {!isLoggedIn && <Login changeLoggedInStatus={loggedInHandler} />}
          <Routes>
            <Route path="/council" element={<Council />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/election" element={<Election />} />
            <Route path="/candidateform" element={<CandidateForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
