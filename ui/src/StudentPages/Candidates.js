import { useState } from "react";
import { Link } from 'react-router-dom';
export default function Candidates() {
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
        showAlertBoxHandler()
    }
    function showAlertBoxHandler(index) {
        setCurrentIndex(index)
        setShowAlertBox(!showAlertBox)
    }
    const alertBox = <div>
        Are you sure
        <button onClick={incrementVote}>Yes</button><button onClick={showAlertBoxHandler}>No</button></div>

return (
    <div className="container">
      {showAlertBox ? (
        <div className="alert">{alertBox}</div>
      ) : (
        <ul>
          {currentCandidates.map((candidate, index) => (
            <li className="list-item" key={index}>
              <span className="candidate-info">
                {candidate.name} {candidate.gpa} {candidate.department} {candidate.description} {candidate.currentVote}
              </span>
              <button onClick={() => showAlertBoxHandler(index)}>Vote</button>
            </li>
          ))}
        </ul>
      )}
      {!showAlertBox && <Link to="/candidateform">
        <button>Be candidate</button>
      </Link>}
      
    </div>
  );
  
}