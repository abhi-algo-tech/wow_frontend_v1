import React, { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Button } from "antd";

const SingleDatePicker = ({
  onDateChange,
  showButtons = true,
  bgBorder = false,
  fontSize = 16,
  gap = 0,
}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Today's date

  // Format the selected date
  const getFormattedDate = () => {
    return selectedDate.format("MMM DD");
  };

  // Update the date and trigger callback
  const updateDate = (direction) => {
    const daysToShift = direction === "next" ? 1 : -1; // Move one day forward or backward
    const newDate = selectedDate.add(daysToShift, "day");

    setSelectedDate(newDate);

    if (onDateChange) {
      onDateChange(newDate); // Callback for parent
    }
  };

  // Styles for the container
  const containerStyle = bgBorder
    ? {
        height: "40px",
        flexShrink: 0,
        borderRadius: "8px",
        background: "rgba(177, 175, 233, 0.10)",
        padding: "0 10px",
      }
    : {};

  return (
    <div
      className={`d-flex justify-content-between align-items-center ${
        gap ? `gap${gap}` : ""
      }`}
      style={containerStyle}
    >
      {showButtons ? (
        <Button
          className="schedule-date-arrow"
          icon={<LeftOutlined className="text-white" />}
          onClick={() => updateDate("previous")} // Update for previous day
        />
      ) : (
        <LeftOutlined onClick={() => updateDate("previous")} />
      )}
      <span
        className={`${fontSize === 16 ? "schedule-16-500" : "label-14-500"}`}
      >
        {getFormattedDate()}
      </span>
      {showButtons ? (
        <Button
          className="schedule-date-arrow"
          icon={<RightOutlined className="text-white" />}
          onClick={() => updateDate("next")} // Update for next day
        />
      ) : (
        <RightOutlined onClick={() => updateDate("next")} />
      )}
    </div>
  );
};

export default SingleDatePicker;
