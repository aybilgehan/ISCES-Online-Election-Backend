import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = () => {
  const [date, setDate] = useState(null);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <DatePicker
      selected={date}
      onChange={handleDateChange}
      dateFormat="yyyy-MM-dd"
      placeholderText="YYYY-MM-DD"
    />
  );
};
export default DateInput;