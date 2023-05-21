import React, { useState, useEffect } from "react";
import "./Election.css";
import { Chart } from "react-google-charts";
import axios from "axios";

function Election() {
  const [department, setDepartment] = useState()
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const url = "http://localhost:8080/students";
  const fetchInfo = async () => {
    const response = await axios.get(url);
    setCandidates(response.data);
  };
  useEffect(() => {
    fetchInfo();
  }, []);


  useEffect(() => {
    const transformedCandidates = [
      ["Name", "Percentage"],
      ...candidates
        .filter(candidate => candidate.department === department)
        .map(candidate => [candidate.firstName, candidate.currentVote]),
    ];
  
    setFilteredCandidates(transformedCandidates);
  }, [department]);
  

  const chartHandler = (event) => {
    setDepartment(event.target.value);
  };

  const options = {
    title: "Election Results",
    is3D: true,
  };
  console.log(filteredCandidates.length)
  return (
    <div className="container">
      <form>
        <label htmlFor="department">Department:</label>
        <select name="department" id="department" onChange={chartHandler}>
          <option>Please select a department</option>
          <option value="Computer Engineering">Computer Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Electronic Engineering">Electronic Engineering</option>
        </select>
      </form>
      {filteredCandidates.length > 1 && <Chart chartType="PieChart" data={filteredCandidates} options={options} />}

    </div>
  );
}

export default Election;
