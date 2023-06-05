import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CandidateCard from "./CandidateCard";
import AuthContext from "../context/AuthContext";
import axios from "axios";

//candidatelar liste olarak çekilecek.(tik) her bir candidate'ın idsinden departmantlar çekilecek ve bizim aktif kullanıcımızın departmanı ile eşleşenler listelenecek.localhost:8080/getdepartment/authctx.id=== localhost:8080/getdepartment/candidate.id
//kullanıcı oy kullandığında isvoted true olacak ve candidate'ın currentvote'u 1 artacak.
//localhost:8080/incrementvote/candidate.id
//localhost:8080/isvoted/authctx.id

export default function Candidates() {
  const authCtx = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);
  const url = `http://localhost:8080/candidates/${authCtx.userDepartment}`;

  useEffect(() => {
    fetchCandidateInfo();
  }, []);

  const fetchCandidateInfo = async () => {
    try {
      const response = await axios.get(url);
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  // const voteHandler = async (id) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8080/students/isvoted/${id}`
  //     );
  //     if (response.data === true) {
  //       console.log("This user has already voted.");
  //       return;
  //     } else {
  //       console.log(id, "id'sine sahip kullanici 1 oy kazandı");
  //       const response1 = await axios.put(
  //         `http://localhost:8080/students/setisvoted/${id}`
  //       );
  //       const response2 = await axios.put(
  //         `http://localhost:8080/candidates/incrementvote/${id}`
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Voting  :", error);
  //   }
  // };
  const voteHandler = async (id) => {
    try {
      const voted = authCtx.isVoted;
      if (voted === true) {
        console.log("This user has already voted.");
        return;
      } else {
        console.log(id, "id'sine sahip kullanici 1 oy kazandı");
        const studentNumber = localStorage.getItem("uid");
        const response = await axios.get(
          `http://localhost:8080/vote/${studentNumber}/${id}`
        );
        fetchCandidateInfo();
      }
    } catch (error) {
      console.error("Voting  :", error);
    }
  };

  return (
    <div className="container">
      <ul>
        {candidates.map((candidate, index) => (
          <li className="list-item" key={index}>
            {candidate.student.firstName}
            <br></br>
            {candidate.votes}
            <br></br>
            <button onClick={() => voteHandler(candidate.candidateId)}>
              Vote
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
