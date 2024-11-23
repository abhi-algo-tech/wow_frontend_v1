import React from "react";
import { DatePicker, Form } from "antd";
import { DatePickerProps } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Extend dayjs to handle custom parsing format
dayjs.extend(customParseFormat);

const dateFormat = "MMM DD, YYYY"; // Format "Oct 29, 2024"

// Custom DatePicker format
const customFormat: DatePickerProps["format"] = (value) =>
  value ? value.format(dateFormat) : "Not a valid date";

// Custom DatePicker component
interface CustomDatePickerProps {
  name: string;
  required?: boolean;
  rules?: any[];
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  name,
  required = false,
  rules = [],
}) => {
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required,
          message: "Date is required", // Default message without label
        },
        ...rules, // Allow additional custom validation rules
      ]}
    >
      <DatePicker
        format={dateFormat}
        className="custom-date-picker"
        placeholder="Select a date"
      />
    </Form.Item>
  );
};

export default CustomDatePicker;
