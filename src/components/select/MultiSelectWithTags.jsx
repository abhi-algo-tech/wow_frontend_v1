import React, { useState, useCallback } from "react";
import { Select, Checkbox, Tag } from "antd";
import PropTypes from "prop-types";
import "./MultiSelectWithTags.css";

const colors = ["gold", "lime", "cyan", "orange", "green"];

const MultiSelectWithTags = ({ value, onChange, name, options, ...props }) => {
  const [colorMap, setColorMap] = useState({});

  const getColorForValue = useCallback(
    (value) => {
      if (!colorMap[value]) {
        let newColor;
        do {
          newColor = colors[Math.floor(Math.random() * colors.length)];
        } while (Object.values(colorMap).includes(newColor));
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
        color={getColorForValue(label)}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        className="chip"
      >
        {label}
      </Tag>
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onChange(options.map((option) => option.value));
    } else {
      onChange([]);
    }
  };

  const dropdownRender = (menu) => (
    <div>
      {value && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "4px 12px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Checkbox
            checked={value.length === options.length}
            indeterminate={value.length > 0 && value.length < options.length}
            onChange={(e) => handleSelectAll(e.target.checked)}
          >
            Select All
          </Checkbox>
        </div>
      )}
      {menu}
    </div>
  );

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
        dropdownRender={dropdownRender}
        options={options}
        // menuItemSelectedIcon={null} // Removes the check icon
        filterOption={
          (inputValue, option) =>
            option.label.toLowerCase().includes(inputValue.toLowerCase()) // Filters based on the label
        }
        {...props}
      />
    </div>
  );
};

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
