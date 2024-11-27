import React, { useState, useCallback } from "react";
import { Select, Tag } from "antd";
import PropTypes from "prop-types";
import "./MultiSelectWithTags.css";

const colors = ["gold", "lime", "cyan", "orange", "green"];

const MultiSelectWithTags = ({ value, onChange, name, options, ...props }) => {
  const [colorMap, setColorMap] = useState({});

  // Function to pick a random color, ensuring it doesn't repeat for the same tag
  const getColorForValue = useCallback(
    (value) => {
      if (!colorMap[value]) {
        let newColor;
        do {
          newColor = colors[Math.floor(Math.random() * colors.length)];
        } while (Object.values(colorMap).includes(newColor)); // Ensure the color is unique
        setColorMap((prevMap) => ({ ...prevMap, [value]: newColor }));
      }
      return colorMap[value];
    },
    [colorMap]
  );

  const tagRender = (props) => {
    const { label, closable, onClose } = props;

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        color={getColorForValue(label)} // Assign a color based on the value
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
        className="chip" // Apply chip styles
      >
        {label}
      </Tag>
    );
  };

  return (
    <div>
      <Select
        id={name}
        name={name}
        mode="multiple"
        tagRender={tagRender}
        value={value}
        onChange={onChange}
        style={{ width: "100%" }}
        options={options}
        {...props}
      />
    </div>
  );
};

// Prop validation
MultiSelectWithTags.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

MultiSelectWithTags.defaultProps = {
  value: [],
};

export default MultiSelectWithTags;
