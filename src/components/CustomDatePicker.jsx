import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Extend dayjs to handle custom parsing format
dayjs.extend(customParseFormat);

const dateFormat = "MMM DD, YYYY"; // Desired format: Dec 04, 2024

const CustomDatePicker = ({
  value,
  onChange,
  placeholder = "Select a date",
  autoSelectToday = false,
  disabled = false,
  isDisabledBackDate = false,
}) => {
  // Parse the incoming value to a dayjs object or null if invalid
  const parsedValue = value
    ? dayjs(value, "YYYY-MM-DD", true)
    : autoSelectToday
    ? dayjs() // Use today's date if autoSelectToday is true
    : null;
  // Handle date changes and ensure the format
  const handleChange = (date) => {
    if (onChange) {
      onChange(date ? date.format("YYYY-MM-DD") : null); // Emit ISO format
    }
  };
  // Disable dates before today
  const disabledDateCal = (current) => {
    return current && current.isBefore(dayjs(), "day");
  };
  const disabledDate = isDisabledBackDate ? disabledDateCal : false;
  return (
    <DatePicker
      value={parsedValue} // Pass the dayjs object to DatePicker
      onChange={handleChange} // Trigger change handler
      format={dateFormat} // Display format
      className="custom-date-picker"
      placeholder={placeholder}
      allowClear // Allow clearing the date
      disabled={disabled}
      disabledDate={disabledDate} // Disable backdates
    />
  );
};

export default CustomDatePicker;
