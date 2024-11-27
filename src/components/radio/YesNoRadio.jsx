import React from "react";
import { Radio } from "antd";
import "./YesNoRadio.css"; // Import the CSS file

const YesNoRadio = ({ options, name, defaultValue, onChange }) => {
  return (
    <div className="yes-no-radio-container">
      <Radio.Group name={name} defaultValue={defaultValue} onChange={onChange}>
        {options.map((option) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export default YesNoRadio;
