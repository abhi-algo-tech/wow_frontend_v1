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
  disableWeekends = false,
}) => {
  // Parse the incoming value to a dayjs object or null if invalid
  let parsedValue = value
    ? dayjs(value, "YYYY-MM-DD", true)
    : autoSelectToday
    ? dayjs() // Use today's date if autoSelectToday is true
    : null;

  // If disableWeekends is true and the selected date is a weekend, set it to the following Monday
  if (
    disableWeekends &&
    parsedValue &&
    (parsedValue.day() === 6 || parsedValue.day() === 0)
  ) {
    parsedValue = parsedValue.day(8); // Set to Monday of the next week
    if (onChange) {
      onChange(parsedValue.format("YYYY-MM-DD")); // Emit the adjusted date
    }
  }

  // Handle date changes and ensure the format
  const handleChange = (date) => {
    if (onChange) {
      onChange(date ? date.format("YYYY-MM-DD") : null); // Emit ISO format
    }
  };

  // Disable dates logic
  const disabledDateCal = (current) => {
    // Disable backdates
    const isBeforeToday = current && current.isBefore(dayjs(), "day");

    // Disable weekends (Saturday = 6, Sunday = 0)
    const isWeekend =
      disableWeekends && (current.day() === 6 || current.day() === 0);

    // Combine conditions
    return isBeforeToday || isWeekend;
  };

  const disabledDate =
    isDisabledBackDate || disableWeekends ? disabledDateCal : false;

  return (
    <DatePicker
      value={parsedValue} // Pass the dayjs object to DatePicker
      onChange={handleChange} // Trigger change handler
      format={dateFormat} // Display format
      className="custom-date-picker"
      placeholder={placeholder}
      allowClear // Allow clearing the date
      disabled={disabled}
      disabledDate={disabledDate} // Disable backdates and weekends
    />
  );
};

export default CustomDatePicker;
