import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "./SetElectionDate.css";

const SetElectionDate = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [electionIsOn, setElectionIsOn] = useState(false);

  useEffect(() => {
    checkElectionIsOn();
  }, []);

  const checkElectionIsOn = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/isInElectionProcess"
      );
      setElectionIsOn(response.data);
    } catch (error) {
      // Handle error
    }
  };

  const handleDateTimeChange = (date, inputType) => {
    if (inputType === "start") {
      setStartDate(date);
    } else if (inputType === "end") {
      setEndDate(date);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("isDateSet", true);
    if (startDate) {
      let startDateConverted = new Date(
        startDate.getTime() + 3 * 60 * 60 * 1000
      );
      let endDateConverted = new Date(endDate.getTime() + 3 * 60 * 60 * 1000);
      startDateConverted = startDateConverted.toISOString().substring(0, 19);
      endDateConverted = endDateConverted.toISOString().substring(0, 19);
      console.log("Selected date and time:", startDateConverted);
      console.log("Selected date and time:", endDateConverted);
      const startUrl = `http://localhost:8080/enterElectionDate/${startDateConverted}/${endDateConverted}`;
      axios.get(startUrl).then((response) => {
        console.log(response.status, response);
      });
    }
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="set-election-date-container">
      {!electionIsOn ? (
        <form onSubmit={handleSubmit}>
          <div className="date-time-boxes">
            <div className="start-date-time-box date-time-box">
              <label htmlFor="start-date-time">Set Start Date and Time</label>
              <br />
              <br />
              <DatePicker
                id="start-date-time"
                selected={startDate}
                onChange={(date) => handleDateTimeChange(date, "start")}
                dateFormat="yyyy-MM-dd HH:mm"
                showTimeInput
                timeInputLabel="Time:"
                timeFormat="HH:mm"
                placeholderText="YYYY-MM-DD HH:mm"
              />
            </div>

            <br />
            <br />
            <div className="end-date-time-box date-time-box">
              <label htmlFor="end-date-time">Set End Date and Time</label>
              <br />
              <br />
              <DatePicker
                id="end-date-time"
                selected={endDate}
                onChange={(date) => handleDateTimeChange(date, "end")}
                dateFormat="yyyy-MM-dd HH:mm"
                showTimeInput
                timeInputLabel="Time:"
                timeFormat="HH:mm"
                placeholderText="YYYY-MM-DD HH:mm"
              />
            </div>
          </div>
          <br />
          <br />
          <button className="set-election-date-button" type="submit">
            Set
          </button>
        </form>
      ) : (
        <div>Election is currently active.</div>
      )}
    </div>
  );
};

export default SetElectionDate;
