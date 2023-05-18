import React from "react";
import DateInput from "../RectorPages/DateInput";

const SetElectionDate = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // reset the bar 
    // send the date to the backend
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Set Election Date</label>
        <br />
        <br />
        <DateInput />
        <br />
        <br />
        <button type="submit">Set</button>
      </form>
    </div>
  );
};

export default SetElectionDate;
