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
  const defaultValue = dayjs("2000-01-01"); // Hardcoded default value

  // Handle date changes and ensure the format
  const handleChange = (date) => {
    if (onChange) {
      onChange(date ? date.format("YYYY-MM-DD") : null); // Emit ISO format
    }
  };

  return (
    <Form.Item
      name={name}
      rules={[
        ...rules,
        ...(required
          ? [{ required: true, message: "Please select a date" }]
          : []),
      ]}
    >
      <DatePicker
        defaultValue={defaultValue} // Set the default value here
        // value={defaultValue}
        // value={value ? dayjs(value, "YYYY-MM-DD") : undefined} // Handle controlled input
        onChange={handleChange} // Trigger change handler
        // format={dateFormat} // Display format
        className="custom-date-picker"
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

export default CustomDatePicker;

// import React from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Form } from "antd";
// import { parse, format } from "date-fns";

// const dateFormat = "MMM dd, yyyy"; // Desired format: Dec 04, 2024

// const CustomDatePicker = ({
//   name,
//   required = false,
//   rules = [],
//   value,
//   onChange,
//   placeholder = "Select a date",
// }) => {
//   // Parse the incoming value to a Date object or null if invalid
//   const parsedValue = value ? parse(value, "yyyy-MM-dd", new Date()) : null;

//   // Handle date changes and ensure the format
//   const handleChange = (date) => {
//     if (onChange) {
//       onChange(date ? format(date, "yyyy-MM-dd") : null); // Emit ISO format
//     }
//   };

//   return (
//     <Form.Item
//       name={name}
//       initialValue={parsedValue} // Pass the Date object directly
//       rules={[
//         ...rules,
//         ...(required
//           ? [{ required: true, message: "Please select a date" }]
//           : []),
//       ]}
//     >
//       <DatePicker
//         selected={parsedValue} // Pass the Date object to DatePicker
//         onChange={handleChange} // Trigger change handler
//         dateFormat={dateFormat} // Display format
//         placeholderText={placeholder}
//         className="custom-date-picker"
//       />
//     </Form.Item>
//   );
// };

// export default CustomDatePicker;
