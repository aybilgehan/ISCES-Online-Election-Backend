import React, { useContext, useState, useEffect } from "react";
import "./Election.css";
import { Chart } from "react-google-charts";

import axios from "axios";

function Election() {
  const [department, setDepartment] = useState(1);
  const [electionIsOn, setElectionIsOn] = useState(false);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [candidateCount, setCandidateCount] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [isVoted, setIsVoted] = useState(false);

  const checkElectionIsOn = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/isInElectionProcess"
      );
      setElectionIsOn(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    checkElectionIsOn();
    fetchCandidateInfo();
  }, [department]);

  const fetchCandidateInfo = async () => {
    try {
      let url = `http://localhost:8080/candidates/${department}`;
      const response = await axios.get(url);
      const transformedCandidates = [
        ["Name", "Percentage"],
        ...response.data.map((candidate) => [
          candidate.student.firstName,
          candidate.votes,
        ]),
      ];
      console.log(transformedCandidates);

      setCandidateCount(response.data.length); // Set the candidate count
      setFilteredCandidates(transformedCandidates);
      setCandidates(response.data);
      console.log(filteredCandidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const options = {
    title: "Election Results",
    is3D: true,
  };

  const chartHandler = (event) => {
    console.log(event.target.value);

    setDepartment(event.target.value);
  };

  const concludeElection = () => {
    // Find the candidate(s) with the highest percentage
    let maxVote = 0;
    let candidateWithMaxVotes = [];
    let hasMultipleMaxValues = false;

    for (let i = 0; i < candidates.length; i++) {
      const votes = candidates[i].votes;

      if (votes > maxVote) {
        maxVote = votes;
        candidateWithMaxVotes = [candidates[i]];
        hasMultipleMaxValues = false;
      } else if (votes === maxVote) {
        candidateWithMaxVotes.push(candidates[i]);
        hasMultipleMaxValues = true;
      }
    }

    console.log(
      "Candidates with the highest percentage:",
      candidateWithMaxVotes
    );
    console.log("Highest percentage:", maxVote);
    console.log(
      "Has multiple candidates with the highest percentage:",
      hasMultipleMaxValues
    );

    // Check if there are equal maximum votes
    const maxVotes = Math.max(
      ...candidates.map((candidate) => candidate.votes)
    );
    const candidatesWithMaxVotes = candidates.filter(
      (candidate) => candidate.votes === maxVotes
    );

    console.log("Candidates with the maximum votes:", candidatesWithMaxVotes);
    console.log(
      "Has multiple candidates with the maximum votes:",
      candidatesWithMaxVotes.length > 1
    );

    const departments = [
      ...new Set(
        candidates.map((candidate) => candidate.student.department.departmentId)
      ),
    ];

    const handleCandidateSelect = (department, candidateId) => {
      setSelectedCandidates((prevState) => ({
        ...prevState,
        [department]: candidateId,
      }));
    };

    const handleConcludeTie = (department) => {
      // Process the selected candidate ID for the department and send it to the backend
      const selectedCandidateId = selectedCandidates[department];
      // Send the selectedCandidateId to the backend using your preferred method (e.g., API call)
      console.log(
        `Conclude Tie for ${department}: Selected Candidate ID:`,
        selectedCandidateId
      );
    };

    return (
      <>
        {candidateWithMaxVotes.length > 1 && (
          <>
            <h1>Conclude Tie</h1>
            {departments.map((department) => (
              <div className="department" key={department}>
                <h2>{department}</h2>
                <div className="candidates">
                  {candidatesWithMaxVotes
                    .filter(
                      (candidate) =>
                        candidate.student.department.departmentId === department
                    )
                    .map((candidate) => (
                      <div className="candidate" key={candidate.candidateId}>
                        <h3>
                          {candidate.student.firstName}{" "}
                          {candidate.student.lastName}
                        </h3>
                        <input
                          type="checkbox"
                          checked={
                            selectedCandidates[department] ===
                            candidate.candidateId
                          }
                          onChange={() =>
                            handleCandidateSelect(
                              department,
                              candidate.candidateId
                            )
                          }
                        />
                      </div>
                    ))}
                </div>
                <button
                  onClick={() => handleConcludeTie(department)}
                  disabled={!selectedCandidates[department]}
                >
                  Conclude Tie
                </button>
              </div>
            ))}
          </>
        )}
      </>
    );
  };

  return (
    <div className="container">
      {electionIsOn && <h1>Election is currently in progress.</h1>}
      {!electionIsOn && candidateCount !== 0 && (
        <div>
          <form>
            <select value={department} onChange={chartHandler}>
              <option value="1">Electronic Engineering</option>
              <option value="2">Computer Engineering</option>
              <option value="3">Mechanical Engineering</option>
              <option value="4">Civil Engineering</option>
            </select>
          </form>
          <Chart
            chartType="PieChart"
            data={filteredCandidates}
            options={options}
          />
          {!isVoted && concludeElection()}
        </div>
      )}
      {!electionIsOn && candidateCount === 0 && (
        <div>
          <form>
            <select value={department} onChange={chartHandler}>
              <option value="1">Electronic Engineering</option>
              <option value="2">Computer Engineering</option>
              <option value="3">Mechanical Engineering</option>
              <option value="4">Civil Engineering</option>
            </select>
          </form>
          <h1>There are no candidates for this department.</h1>
        </div>
      )}
    </div>
  );
}

export default Election;
