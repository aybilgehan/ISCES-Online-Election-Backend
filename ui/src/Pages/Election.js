import React, { useState, useEffect } from "react";
import "./Election.css";
import { Chart } from "react-google-charts";
import axios from "axios";

function Election() {
  const [department, setDepartment] = useState("computer");
  const [candidates, setCandidates] = useState([]);

  const [data, setData] = useState([]);
  const url = "http://localhost:8080/students";
  const fetchInfo = async () => {
    const response = await axios.get(url);

    return setData(response.data);
  };
  console.log(data);
  useEffect(() => {
    fetchInfo();
    let candidates = [];
    candidates = [
      ...data.map((candidate) => [candidate.name, candidate.percentage]),
    ];
    // console.log(candidates)
  }, []);

  // useEffect(() => {
  //   let transformedCandidates = [];
  //   if (department === "computer") {
  //     transformedCandidates = [
  //       ["Name", "Percentage"],
  //       ...computerEngineeringCandidates.map((candidate) => [
  //         candidate.name,
  //         candidate.percentage,
  //       ]),
  //     ];
  //   } else if (department === "civil") {
  //     transformedCandidates = [
  //       ["Name", "Percentage"],
  //       ...civilEngineeringCandidates.map((candidate) => [
  //         candidate.name,
  //         candidate.percentage,
  //       ]),
  //     ];
  //   }
  //   setCandidates(transformedCandidates);
  // }, [department]);

  useEffect(() => {
    const transformedCandidates = [
      ["Name", "Percentage"],
      ...data.map((candidate) => [candidate.name, candidate.percentage]),
    ];

    setCandidates(transformedCandidates);
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
      <Chart chartType="PieChart" data={candidates} options={options} />
    </div>
  );
}

export default Election;
