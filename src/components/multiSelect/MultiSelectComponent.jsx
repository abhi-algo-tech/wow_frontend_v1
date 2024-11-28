import React, { useState } from "react";
import { Select, Tag } from "antd";

const options = [
  {
    id: 1,
    color: "gold",
    label: "1-Blue-D",
  },
  {
    id: 2,
    color: "lime",
    label: "2-Blue-D",
  },
  {
    id: 3,
    color: "green",
    label: "3-Blue-D",
  },
  {
    id: 4,
    color: "cyan",
    label: "4-Blue-D",
  },
];

// Custom tag rendering function
const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const option = options.find((option) => option.label === label);

  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={option?.color || "default"} // Use the color from options
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginInlineEnd: 4,
      }}
    >
      {label}
    </Tag>
  );
};

// MultiSelect Component
const MultiSelectComponent = ({ setSelectedClassrooms }) => {
  const [selectedValues, setSelectedValues] = useState([
    "1-Blue-D",
    "4-Blue-D",
  ]); // Default values

  const handleChange = (values) => {
    setSelectedValues(values);
    const selectedOptions = values.map((label) =>
      options.find((option) => option.label === label)
    );
    // console.log("selectedOptions", selectedOptions);

    setSelectedClassrooms?.(selectedOptions); // Pass selected classrooms if provided
  };

  return (
    <Select
      mode="multiple"
      tagRender={tagRender}
      value={selectedValues} // Controlled value
      onChange={handleChange} // Handle selection changes
      style={{
        width: "100%",
      }}
      options={options.map((option) => ({
        label: option.label, // Display label
        value: option.label, // Internal tracking value
      }))}
    />
  );
};

export default MultiSelectComponent;
