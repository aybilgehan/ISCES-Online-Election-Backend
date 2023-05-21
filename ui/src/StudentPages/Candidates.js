import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import CandidateCard from "./CandidateCard";
import AuthContext from "../context/AuthContext";
import axios from "axios"
export default function Candidates() {
  const authCtx = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);
  const url = "http://localhost:8080/students";
  console.log(candidates)
  const fetchInfo = async () => {
    const response = await axios.get(url);
    const filteredCandidates = response.data.filter((candidate) => candidate.department == authCtx.userDepartment);
    setCandidates(filteredCandidates);
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  const [showAlertBox, setShowAlertBox] = useState(false);


  function incrementVote() {

  }
  function showAlertBoxHandler(index) {
    setShowAlertBox(!showAlertBox);
  }

  const alertBox = (
    <div>
      Are you sure
      <button onClick={incrementVote}>Yes</button>
      <button onClick={showAlertBoxHandler}>No</button>
    </div>
  );

  return (
    <div className="container">
      {showAlertBox ? (
        <div className="alert">{alertBox}</div>
      ) : (
        <ul>
        {candidates.map((candidate, index) => (
            <li className="list-item" key={index}>
              <CandidateCard
                photo="https://i0.wp.com/bakikaracay.com/wp-content/uploads/2016/09/Kamera-I%C5%9F%C4%B1k-Foto%C4%9Fraf.jpg?fit=810%2C540&ssl=1"
                name={candidate.firstName}
                gpa={candidate.gpa}
                department={candidate.department}
                description={candidate.description}
                currentVote={candidate.currentVote}
              />
            </li>
          )
        )}
      </ul>
      )}
    </div>
  );
}
