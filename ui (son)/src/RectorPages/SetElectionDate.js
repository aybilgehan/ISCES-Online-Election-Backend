import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const SetElectionDate = () => {
  const [dateTime, setDateTime] = useState(null);
  const url = "http://localhost:8080/electionDate";

  const handleDateTimeChange = (selectedDateTime) => {
    setDateTime(selectedDateTime);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dateTime) {
      console.log("Selected date and time:", dateTime);
      axios.post(url, { dateTime: JSON.stringify(dateTime) }).then((response) => {
        console.log(response.status, response);
      });
    }
    setDateTime(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="election-date-time">Set Election Date and Time</label>
        <br />
        <br />
        <DatePicker
          id="election-date-time"
          selected={dateTime}
          onChange={handleDateTimeChange}
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
    </div>
  );
};

export default SetElectionDate;
