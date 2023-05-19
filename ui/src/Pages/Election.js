import React, { useState, useEffect } from 'react';
import './Election.css';
import { Chart } from 'react-google-charts';

function Election() {
  const [department, setDepartment] = useState('computer');
  const [candidates, setCandidates] = useState([]);

  const computerEngineeringCandidates = [
    { name: 'Emre BlackMist', percentage: 25 },
    { name: 'Ahmet SelfIron', percentage: 25 },
    { name: 'YoungMoon 2rgood', percentage: 25 },
    { name: 'Halil Can Awake', percentage: 25 },
  ];

  const civilEngineeringCandidates = [
    { name: 'Emre', percentage: 25 },
    { name: 'Ahmet', percentage: 25 },
    { name: 'YoungMoon', percentage: 25 },
    { name: 'Halil', percentage: 25 },
  ];

  useEffect(() => {
    let transformedCandidates = [];
    if (department === 'computer') {
      transformedCandidates = [
        ['Name', 'Percentage'],
        ...computerEngineeringCandidates.map(candidate => [
          candidate.name,
          candidate.percentage,
        ]),
      ];
    } else if (department === 'civil') {
      transformedCandidates = [
        ['Name', 'Percentage'],
        ...civilEngineeringCandidates.map(candidate => [
          candidate.name,
          candidate.percentage,
        ]),
      ];
    }
    setCandidates(transformedCandidates);
  }, [department]);
  

  const chartHandler = (event) => {
    setDepartment(event.target.value);
  };

  const options = {
    title: 'Election Results',
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
