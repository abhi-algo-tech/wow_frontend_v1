import React from "react";
import { Radio } from "antd";
import PropTypes from "prop-types";
import "./YesNoRadio.css";

// YesNoRadio Component
const YesNoRadio = ({ options, name, value, onChange }) => {
  return (
    <div className="yes-no-radio-container">
      <Radio.Group
        name={name}
        value={value} // Controlled value directly from parent
        onChange={onChange}
      >
        {options.map((option) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

// Validate props
YesNoRadio.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

export default YesNoRadio;
