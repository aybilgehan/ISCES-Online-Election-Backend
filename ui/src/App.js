import React from "react";
import Login from "./Pages/Login";
import Candidates from "./Pages/Candidates";
import Election from "./Pages/Election";
import CandidateForm from "./Pages/CandidateForm";
import SideBar from "./Sidebar-Components/SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <SideBar /> 
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/election" element={<Election />} />
          <Route path="/candidateform" element={<CandidateForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
