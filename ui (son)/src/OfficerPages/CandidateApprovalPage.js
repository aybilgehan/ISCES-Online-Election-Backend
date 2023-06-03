import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const CandidateApprovalPage = () => {
  // Fetch candidates with their motivation text, transcript of records, and criminal record
  // Provide dummy data for now
  const authCtx = useContext(AuthContext);
  const [unEvalCandidates, setUnEvalCandidates] = useState([]);
  const url = `http://localhost:8080/unevaluatedStudents/1`;

  useEffect(() => {
    fetchCandidateInfo();
  }, []);

  const fetchCandidateInfo = async () => {
    try {
      const response = await axios.get(url);
      setUnEvalCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const updateCandidates = async (url) => {
    try {
      const response = await axios.get(url);
    } catch (error) {
      console.log("Error updating approved candidate", error);
    }
  };

  // const [candidates, setCandidates] = useState([
  //   {
  //     id: 1,
  //     name: "Candidate 1",
  //   },
  //   {
  //     id: 2,
  //     name: "Candidate 2",
  //   },
  //   {
  //     id: 3,
  //     name: "Candidate 3",
  //   },
  // ]);

  const approveCandidate = (studentNumber) => {
    // Remove the approved candidate from the list
    const updatedCandidates = unEvalCandidates.filter(
      (candidate) => candidate.studentNumber !== studentNumber
    );
    setUnEvalCandidates(updatedCandidates);

    // TODO: Send the approved candidate to the backend for further processing
    const urlForUpdate = `http://localhost:8080/confirmStudent/${studentNumber}`;
    updateCandidates(urlForUpdate);
  };

  const rejectCandidate = (studentNumber) => {
    // Remove the rejected candidate from the list
    const updatedCandidates = unEvalCandidates.filter(
      (candidate) => candidate.studentNumber !== studentNumber
    );
    setUnEvalCandidates(updatedCandidates);
    // TODO: Send the rejected candidate to the backend for further processing
    const urlForUpdate = `http://localhost:8080/rejectStudent/${studentNumber}`;
    updateCandidates(urlForUpdate);
  };

  return (
    <div>
      {unEvalCandidates.map((candidate) => (
        <div key={candidate.candidateId}>
          <h3>{candidate.firstName}</h3>
          <button onClick={() => approveCandidate(candidate.studentNumber)}>
            Approve
          </button>
          <button onClick={() => rejectCandidate(candidate.studentNumber)}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
};

export default CandidateApprovalPage;
