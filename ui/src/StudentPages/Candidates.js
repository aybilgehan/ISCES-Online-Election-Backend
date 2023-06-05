import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

//candidatelar liste olarak çekilecek.(tik) her bir candidate'ın idsinden departmantlar çekilecek ve bizim aktif kullanıcımızın departmanı ile eşleşenler listelenecek.localhost:8080/getdepartment/authctx.id=== localhost:8080/getdepartment/candidate.id
//kullanıcı oy kullandığında isvoted true olacak ve candidate'ın currentvote'u 1 artacak.
//localhost:8080/incrementvote/candidate.id
//localhost:8080/isvoted/authctx.id

export default function Candidates() {
  const authCtx = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);
  const [votedCandidateName, setVotedCandidateName] = useState();
  const url = `http://localhost:8080/candidates/${authCtx.userDepartment}`;
  const studentNum = localStorage.getItem("uid");
  const url2 = `http://localhost:8080/users`;
  useEffect(() => {
    fetchStudentInfo();
  }, []);
  const fetchStudentInfo = async () => {
    try {
      const response = await axios.get(url2);
      console.log(response)
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };
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

  const voteHandler = async (candidate) => {
    try {
      const studentNumber = localStorage.getItem("uid");
      const response = await axios.get(
        `http://localhost:8080/vote/${studentNumber}/${candidate}`
      );
      fetchCandidateInfo();
    }
    catch (error) {
      console.log(error)
    }
  };
  console.log(votedCandidateName)
  const votedScreen = (
    <div className="AlertBox">
      <h5>You voted {votedCandidateName}!</h5>
    </div>
  );

  const candidatesForm = (
    <div className="container">
      <ul>
        {candidates.map((candidate) => (
          <li className="list-item" key={candidate.candidateId}>
            {candidate.student?.user.email}
            <br />
            {candidate.votes}
            <br />
            <button onClick={() => voteHandler(candidate.candidateId)}>
              Vote
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  const showAlert = false
  return (
    <div className="App">
      {showAlert ? votedScreen : candidatesForm}
    </div>
  )
}