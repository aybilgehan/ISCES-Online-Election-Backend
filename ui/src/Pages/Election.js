import React, { useContext, useState, useEffect } from "react";
import "./Election.css";
import { Chart } from "react-google-charts";
import AuthContext from "../context/AuthContext";
import axios from "axios";

function Election() {
  const authCtx = useContext(AuthContext);
  const [department, setDepartment] = useState();
  const [electionIsOn, setElectionIsOn] = useState(false);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [candidateCount, setCandidateCount] = useState(0);

  const checkElectionIsOn = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/isInElectionProcess`
      );
      setElectionIsOn(response.data);
    } catch (error) {}
  };

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

      setCandidates(transformedCandidates);
      setCandidateCount(response.data.length); // Set the candidate count
      setFilteredCandidates(transformedCandidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    checkElectionIsOn();
    fetchCandidateInfo();
  }, [department]);

  const options = {
    title: "Election Results",
    is3D: true,
  };

  const chartHandler = (event) => {
    console.log(event.target.value);

    setDepartment(event.target.value);
  };

  return (
    <div className="container">
      <form>
        <select value={department} onChange={chartHandler}>
          <option value="">All Departments</option>
          <option value="1">Electronic Engineering</option>
          <option value="2">Computer Engineering</option>
          <option value="3">Mechanical Engineering</option>
        </select>
      </form>
      {electionIsOn ? (
        <h1>Election is currently in progress.</h1>
      ) : candidateCount !== 0 ? (
        <Chart
          chartType="PieChart"
          data={filteredCandidates}
          options={options}
        />
      ) : (
        <h1>There are no candidates for this department.</h1>
      )}
    </div>
  );
}

export default Election;
