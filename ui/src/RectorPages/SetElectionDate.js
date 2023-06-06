import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const SetElectionDate = () => {
  const [enteredStartDate, setEnteredStartDate] = useState(null);
  const [enteredEndDate, setEnteredEndDate] = useState(null);
  const [showAlertBox, setShowAlertBox] = useState(false);
  const [isInElectionProcess, setIsInElectionProcess] = useState(false);
  const alertBox = (
    <div>
      Invalid date<button onClick={changeAlertBoxVisible}>ok</button>
    </div>
  );
  const inElectionBox = <h1>We are already in election!</h1>;

  useEffect(() => {
    checkElectionIsOn();
  }, []);
  const checkElectionIsOn = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/isInElectionProcess"
      );
      setIsInElectionProcess(response.data);
    } catch (error) {
      // Handle error
    }
  };
  function changeAlertBoxVisible() {
    setEnteredStartDate(null);
    setEnteredEndDate(null);
    setShowAlertBox(!showAlertBox);
    //reload();
  }
  const reload = () => {
    window.location.reload();
  };
  const handleDateTimeChange = (date, inputType) => {
    if (inputType === "start") {
      setEnteredStartDate(date);
    } else if (inputType === "end") {
      setEnteredEndDate(date);
    }
  };
  async function electionFetch(startDate, endDate) {
    try {
      const url = `http://localhost:8080/enterElectionDate/${startDate}/${endDate}`;

      const response = await axios.get(url);
      setIsInElectionProcess(true);
    } catch (error) {
      console.log(error.message);
    }
  }
  function isInputValid(startDate, endDate) {
    if (startDate && endDate) {
      const currentDate = new Date();
      console.log(currentDate);

      return startDate < endDate && startDate > currentDate;
    }
    return false;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("isDateSet", true);
    if (isInputValid(enteredStartDate, enteredEndDate)) {
      let startDateConverted = new Date(
        enteredStartDate.getTime() + 3 * 60 * 60 * 1000
      );
      let endDateConverted = new Date(
        enteredEndDate.getTime() + 3 * 60 * 60 * 1000
      );
      startDateConverted = startDateConverted.toISOString().substring(0, 19);
      endDateConverted = endDateConverted.toISOString().substring(0, 19);
      // setEnteredStartDate(startDateConverted);
      // setEnteredEndDate(endDateConverted);
      console.log(startDateConverted);
      console.log(endDateConverted);

      electionFetch(startDateConverted, endDateConverted);
    } else {
      changeAlertBoxVisible();
    }
  };
  console.log(isInElectionProcess);
  const endElection = (e) => {
    //BU KOD SADECE TEST İÇİN EKLENDİ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    e.preventDefault();
    localStorage.setItem("isDateSet", false);
  };
  const setElectionForm = (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="start-date-time">Set Start Date and Time</label>
        <br />
        <br />
        <DatePicker
          id="start-date-time"
          selected={enteredStartDate}
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
          selected={enteredEndDate}
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
  console.log(showAlertBox);
  return (
    <div>
      {isInElectionProcess && inElectionBox}
      {showAlertBox ? alertBox : setElectionForm}
    </div>
  );
};
export default SetElectionDate;
