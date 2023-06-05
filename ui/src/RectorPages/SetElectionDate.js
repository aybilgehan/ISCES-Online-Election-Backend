import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const SetElectionDate = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
      let startDateConverted = startDate.toISOString().substring(0, 19);
      let endDateConverted = endDate.toISOString().substring(0, 19);
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
  const endElection = (e) => {
    //BU KOD SADECE TEST İÇİN EKLENDİ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    e.preventDefault();
    localStorage.setItem("isDateSet", false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <br />
        <br />
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
        <br />
        <br />
        <button type="submit">Set</button>
      </form>
      <form>
        <button onSubmit={endElection}>End Election</button>
      </form>
    </div>
  );
};

export default SetElectionDate;