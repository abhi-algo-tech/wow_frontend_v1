import React, { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Button } from "antd";

const WeekDatePicker = ({
  onRangeChange,
  showButtons = true,
  bgBorder = false,
  fontSize = 16,
  gap = 0,
}) => {
  const [startDate, setStartDate] = useState(
    dayjs().startOf("week").add(1, "day")
  ); // Start from Monday
  const [endDate, setEndDate] = useState(dayjs().startOf("week").add(5, "day")); // End on Friday

  // Format the date range
  const getFormattedRange = () => {
    return `${startDate.format("MMM DD")} - ${endDate.format("MMM DD")}`;
  };

  // Update dates and trigger callback
  const updateDates = (direction) => {
    const daysToShift = direction === "next" ? 7 : -7;
    const newStartDate = startDate.add(daysToShift, "day");
    const newEndDate = endDate.add(daysToShift, "day");

    setStartDate(newStartDate);
    setEndDate(newEndDate);

    if (onRangeChange) {
      onRangeChange(newStartDate, newEndDate); // Callback for parent
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
          onClick={() => updateDates("previous")} // Update for previous week
        />
      ) : (
        <LeftOutlined onClick={() => updateDates("previous")} />
      )}
      <span
        className={`${fontSize === 16 ? "schedule-16-500" : "label-14-500"}`}
      >
        {getFormattedRange()}
      </span>
      {showButtons ? (
        <Button
          className="schedule-date-arrow"
          icon={<RightOutlined className="text-white" />}
          onClick={() => updateDates("next")} // Update for next week
        />
      ) : (
        <RightOutlined onClick={() => updateDates("next")} />
      )}
    </div>
  );
};

export default WeekDatePicker;
