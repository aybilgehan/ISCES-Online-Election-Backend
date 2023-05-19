import React, { useState, useEffect } from 'react';
import "./Election.css";
import { Chart } from "react-google-charts";

function Election() {
  const [department, setDepartment] = useState("computer");
  const [candidates, setCandidates] = useState([]);

  const computerEngineeringCandidates = [
    ["Candidate", "Vote percentage"],
    ["Emre BlackMist", 25],
    ["Ahmet SelfIron", 25],
    ["YoungMoon 2rgood", 25],
    ["Halil Can Awake", 25]
  ];

  const civilEngineeringCandidates = [
    ["Candidate", "Vote percentage"],
    ["Fenerbahçe Galatasaray", 25],
    ["Beşiktaşzon ", 25],
    ["Bucaspor ", 25],
    ["Göttepe ", 25]
  ];

  useEffect(() => {
    if (department === "computer") {
      setCandidates(computerEngineeringCandidates);
    } else if (department === "civil") {
      setCandidates(civilEngineeringCandidates);
    }
  }, [department]);

  const chartHandler = (event) => {
    setDepartment(event.target.value);
  };

  const options = {
    title: "Election Results",
    is3D: true,
  };

  return (
    <div className="container">
      <form>
        <label htmlFor="department">Department:</label>
        <select name="department" id="department" onChange={chartHandler}>
          <option value="computer">Computer Engineering</option>
          <option value="civil">Civil Engineering</option>
        </select>
      </form>
      <Chart
        chartType="PieChart"
        data={candidates}
        options={options}
      />
    </div>
  );
}

export default Election;
