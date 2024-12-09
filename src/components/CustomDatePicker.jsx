import React from "react";
import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Extend dayjs to handle custom parsing format
dayjs.extend(customParseFormat);

const dateFormat = "MMM DD, YYYY"; // Format "Oct 29, 2024"

const CustomDatePicker = ({
  name,
  required = false,
  rules = [],
  value, // Add the value prop
  onChange, // Add the onChange handler
}) => {
  return (
    <Form.Item
      name={name}
      initialValue={value ? dayjs(value) : dayjs()} // Initialize with provided value or default to current date
      rules={[
        ...rules, // Allow additional custom validation rules
        ...(required
          ? [{ required: true, message: "Please select a date" }]
          : []),
      ]}
    >
      <DatePicker
        format={dateFormat}
        className="custom-date-picker"
        placeholder="Select a date"
        value={value ? dayjs(value) : undefined} // Set the selected value
        onChange={onChange} // Handle date changes
      />
    </Form.Item>
  );
};

export default CustomDatePicker;
