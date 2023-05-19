import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import CandidateCard from "./CandidateCard";
import AuthContext from "../context/AuthContext";

export default function Candidates() {
  const authCtx = useContext(AuthContext);
  const candidates = [
    { name: "Emre Karaduman", gpa: 3.5, department: "Computer Engineering", description: "dsjkasdjaddaksasasdassd", currentVote: 25 },
    { name: "Halil Uyanik", gpa: 2.6, department: "Civil Engineering", description: "ds132312312312sdassd", currentVote: 15 },
    { name: "Gencay Turgut", gpa: 3.2, department: "Computer Engineering", description: "dfsdfgsdfwef1", currentVote: 20 },
    { name: "Ahmet Özdemir", gpa: 2.8, department: "Computer Engineering", description: "adfsgfgddgdf", currentVote: 10 }
  ];

  const [currentIndex, setCurrentIndex] = useState();
  const [currentCandidates, setCurrentCandidates] = useState(candidates);
  const [showAlertBox, setShowAlertBox] = useState(false);

  function incrementVote() {
    const updatedCandidates = [...currentCandidates];
    updatedCandidates[currentIndex] = {
      ...updatedCandidates[currentIndex],
      currentVote: updatedCandidates[currentIndex].currentVote + 1
    };
    setCurrentCandidates(updatedCandidates);
    showAlertBoxHandler();
  }

  function showAlertBoxHandler(index) {
    setCurrentIndex(index);
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
        <ul type="none" >
        {currentCandidates.map((candidate, index) => (
          authCtx.userDepartment === candidate.department ? (
            <li className="list-item" key={index}>
              <CandidateCard
                photo="https://i0.wp.com/bakikaracay.com/wp-content/uploads/2016/09/Kamera-I%C5%9F%C4%B1k-Foto%C4%9Fraf.jpg?fit=810%2C540&ssl=1"
                name={candidate.name}
                gpa={candidate.gpa}
                department={authCtx.department}
                description={candidate.description}
                currentVote={candidate.currentVote}
                showAlertBoxHandler={() => showAlertBoxHandler(index)}
              />
            </li>
          ) : null
        ))}
      </ul>
      
      )}
    </div>
  );
}
