import React, { useState } from "react";
import { Select, Checkbox, Tag } from "antd";
import PropTypes from "prop-types";
import "./MultiSelectWithTags.css";

const MultiSelectWithoutColor = ({
  value,
  onChange,
  name,
  options,
  ...props
}) => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleSelectAll = (checked) => {
    setSelectAllChecked(checked);
    if (checked) {
      onChange(options.map((option) => option.value));
    } else {
      onChange([]);
    }
  };

  const handleIndividualChange = (selectedValues) => {
    setSelectAllChecked(selectedValues.length === options.length);
    onChange(selectedValues);
  };

  const dropdownRender = (menu) => (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "4px 12px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Checkbox
          checked={selectAllChecked}
          indeterminate={value.length > 0 && value.length < options.length}
          onChange={(e) => handleSelectAll(e.target.checked)}
        >
          Select All
        </Checkbox>
      </div>
      {menu}
    </div>
  );

  const tagRender = (props) => {
    const { label, closable, onClose } = props;

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        className="chip"
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
        onChange={handleIndividualChange}
        style={{ width: "100%" }}
        dropdownRender={dropdownRender}
        options={options.map((opt) => ({
          value: opt.value,
          label: opt.label,
        }))}
        filterOption={(inputValue, option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        }
        {...props}
      />
    </div>
  );
};

MultiSelectWithoutColor.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

MultiSelectWithoutColor.defaultProps = {
  value: [],
};

export default MultiSelectWithoutColor;
