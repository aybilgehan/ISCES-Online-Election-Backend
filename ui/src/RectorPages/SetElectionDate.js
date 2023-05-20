import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SetElectionDate = () => {
  const [date, setDate] = useState(null);
  const url = "http://localhost:8080/electionDate";

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset the form or perform any other necessary actions
    // Send the date to the backend
    if (date) {
      console.log("Selected date:", date);
      axios.post(url, { date: JSON.stringify(date) }).then((response) => {
        console.log(response.status, response);
      });
      // fetch('/api/setElectionDate', {
      //   method: 'POST',
      //   body: JSON.stringify({ date }),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log('Response from backend:', data);
      //     // Handle the response from the backend as needed
      //   })
      //   .catch(error => {
      //     console.error('Error:', error);
      //     // Handle the error as needed
      //   });
    }
    setDate(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="election-date">Set Election Date</label>
        <br />
        <br />
        <DatePicker
          id="election-date"
          selected={date}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="YYYY-MM-DD"
        />
        <br />
        <br />
        <button type="submit">Set</button>
      </form>
    </div>
  );
};

export default SetElectionDate;
