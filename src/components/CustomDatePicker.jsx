import React from "react";
import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Extend dayjs to handle custom parsing format
dayjs.extend(customParseFormat);

const dateFormat = "MMM DD, YYYY"; // Desired format: Dec 04, 2024

const CustomDatePicker = ({
  value,
  onChange,
  placeholder = "Select a date",
}) => {
  // Parse the incoming value to a dayjs object or null if invalid
  const parsedValue = value ? dayjs(value, "YYYY-MM-DD", true) : null;
  // Handle date changes and ensure the format
  const handleChange = (date) => {
    if (onChange) {
      onChange(date ? date.format("YYYY-MM-DD") : null); // Emit ISO format
    }
  };

  return (
    <DatePicker
      value={parsedValue} // Pass the dayjs object to DatePicker
      onChange={handleChange} // Trigger change handler
      format={dateFormat} // Display format
      className="custom-date-picker"
      placeholder={placeholder}
      allowClear // Allow clearing the date
    />
  );
};

export default CustomDatePicker;
