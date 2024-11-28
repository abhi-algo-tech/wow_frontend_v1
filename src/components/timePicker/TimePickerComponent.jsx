import React from "react";
import { TimePicker } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const TimePickerComponent = ({
  value,
  format = "HH:mm",
  suffixIcon = <ClockCircleOutlined style={{ color: "#666" }} />,
  style = { width: 120 },
  allowClear = false,
  onChange,
}) => {
  return (
    <TimePicker
      value={value ? dayjs(value, format) : null}
      format={format}
      suffixIcon={suffixIcon}
      style={style}
      allowClear={allowClear}
      onChange={onChange}
    />
  );
};

export default TimePickerComponent;
