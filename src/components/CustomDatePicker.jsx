import React from "react";
import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Extend dayjs to handle custom parsing format
dayjs.extend(customParseFormat);

const dateFormat = "MMM DD, YYYY"; // Desired format: Dec 04, 2024

const CustomDatePicker = ({
  name,
  required = false,
  rules = [],
  value,
  onChange,
  placeholder = "Select a date",
}) => {
  // Parse the incoming value to a dayjs object or null if invalid
  const parsedValue = value ? dayjs(value, "YYYY-MM-DD", true) : null;
  const changeDateFormate = parsedValue?.format("MMM DD, YYYY");
  // Handle date changes and ensure the format
  const handleChange = (date) => {
    if (onChange) {
      onChange(date ? date.format("YYYY-MM-DD") : null); // Emit ISO format
    }
  };

  return (
    <Form.Item
      name={name}
      initialValue={changeDateFormate} // Set the initial value for the form field as a dayjs object
      rules={[
        ...rules,
        ...(required
          ? [{ required: true, message: "Please select a date" }]
          : []),
      ]}
    >
      <DatePicker
        value={parsedValue} // Pass the dayjs object to DatePicker
        onChange={handleChange} // Trigger change handler
        format={dateFormat} // Display format
        className="custom-date-picker"
        placeholder={placeholder}
        allowClear // Allow clearing the date
      />
    </Form.Item>
  );
};

export default CustomDatePicker;
