import React, { useContext, useState, useEffect } from "react";
import "./Election.css";
import { Chart } from "react-google-charts";
import AuthContext from "../context/AuthContext";
import axios from "axios";
function Election() {
  const authCtx = useContext(AuthContext);
  const isElectionStart = `http://localhost:8080/candidates/`;
  console.log(authCtx)
  const [candidates, setCandidates] = useState([]);
  const url = `http://localhost:8080/candidates/${authCtx.userDepartment}`;
  useEffect(() => {
    fetchCandidateInfo();
  }, []);
  const fetchCandidateInfo = async () => {
    try {
      const response = await axios.get(url);
      const transformedCandidates = [
        ["Name", "Percentage"],
        ...response.data.map((candidate) => [candidate.student.firstName, candidate.votes]),
      ];
      setCandidates(transformedCandidates);

    } catch (error) {

      console.error("Error fetching candidates:", error);
    }
  };


  const options = {
    title: "Election Results",
    is3D: true,
  };
  return (
    
    <div className="container">
      <Chart
        chartType="PieChart"
        data={candidates}
        options={options}
      />
    </div>
  );
}

export default Election;