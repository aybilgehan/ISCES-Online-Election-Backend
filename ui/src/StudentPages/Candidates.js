import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

export default function Candidates() {
  const authCtx = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);
  const [showAlertBox, setShowAlertBox] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const [showSentVoteInfo, setShowSentVoteInfo] = useState(false);
  const [votedCandidateID, setVotedCandidateID] = useState(null);
  const [electionIsOn, setElectionIsOn] = useState(null);
  const url = `http://localhost:8080/candidates/${authCtx.userDepartment}`;
  const studentNum = localStorage.getItem("uid");
  const getStudentUrl = `http://localhost:8080/getStudent/${studentNum}`;

  const checkElectionIsOn = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/isInElectionProcess`
      );
      setElectionIsOn(response.data);
    } catch (error) {
      console.error("Error checking election status:", error);
    }
  };

  useEffect(() => {
    checkElectionIsOn();
    if (electionIsOn) {
      fetchCandidateInfo();
      fetchUserInfo();
    }
  }, [electionIsOn]);

  const fetchCandidateInfo = async () => {
    try {
      const response = await axios.get(url);
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(getStudentUrl);
      setIsVoted(response.data.voted);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const voteHandler = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/vote/${studentNum}/${id}`
      );
      console.log(response);
      if (response.status === 200) {
        setShowSentVoteInfo(true);
        setVotedCandidateID(id);
      }
    } catch (error) {
      console.error("Voting:", error);
    }
  };

  const alertBoxHandler = (candidate) => {
    setVotedCandidateID(candidate.candidateId);
    setShowAlertBox(!showAlertBox);
  };

  const voteForm = (
    <div className="container">
      <ul>
        {candidates.map((candidate, index) => (
          <li className="list-item" key={index}>
            {candidate.student.firstName}
            <br />
            {candidate.votes}
            <br />
            <button onClick={() => alertBoxHandler(candidate)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );

  const electionNotStartBox = <h1>There is no election right now!</h1>;
  const reload = () => {
    window.location.reload();
  };
  const votedInfo = (
    <div>
      Your vote has been sent to {votedCandidateID}
      <button onClick={reload}>OK</button>
    </div>
  );

  const afterVoteScreen = (
    <div>
      You have already voted!
      <h1>Current Candidates</h1>
      <div className="container">
        <ul>
          {candidates.map((candidate, index) => (
            <li className="list-item" key={index}>
              {candidate.student.firstName}
              <br />
              {candidate.votes}
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const alertBox = (
    <div>
      Are you sure you want to vote for {votedCandidateID}?
      <button onClick={() => voteHandler(votedCandidateID)}>Yes</button>
      <button onClick={alertBoxHandler}>No</button>
    </div>
  );



  return (
    <div>
      {!electionIsOn && electionNotStartBox}
      {showSentVoteInfo && votedInfo}
      {(showAlertBox && !showSentVoteInfo) && alertBox}
      {(!isVoted && electionIsOn && !showAlertBox) && voteForm}
      {isVoted && afterVoteScreen}

    </div>
  );
}
