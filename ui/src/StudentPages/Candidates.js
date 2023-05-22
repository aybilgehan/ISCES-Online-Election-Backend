import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CandidateCard from "./CandidateCard";
import AuthContext from "../context/AuthContext";
import axios from "axios";

export default function Candidates() {
  const authCtx = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);
  const url = "http://localhost:8080/students";

  useEffect(() => {
    fetchInfo();
  }, []);
  console.log(authCtx.isVoted)
  const fetchInfo = async () => {
    try {
      const response = await axios.get(url);
      const filteredCandidates = response.data.filter(
        (candidate) => candidate.department === authCtx.userDepartment
      );
      setCandidates(filteredCandidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const voteHandler = (id) => {
    if (authCtx.isVoted) {
      console.log("This user has already voted.");
      return;
    } else {
      console.log(id, "id'sine sahip kullanici 1 oy kazandı")
      authCtx.setIsVotedData(true);
      localStorage.setItem("isVoted", "true");
      //const url = `http://localhost:8080/students/${id}`;
    }
  };


  return (
    <div className="container">
      <ul>
        {candidates.map((candidate, index) => (
          <li className="list-item" key={index}>
            {candidate.id}
            {candidate.photo}
            {candidate.firstName}
            {candidate.gpa}
            {candidate.department}
            {candidate.description}
            {candidate.currentVote}
            <button onClick={() => voteHandler(candidate.id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
