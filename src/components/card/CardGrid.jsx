import React from "react";

const CardGrid = ({ scheduleType = "teacherSchedule", scheduling = [] }) => {
  const startTime = 7 * 60; // Start time: 6:00 AM (in minutes)
  const endTime = 18 * 60; // End time: 6:00 PM (in minutes)

  const colorMapping = {
    inRatio: "#ACF3AA",
    underRatio: "#F38D8D",
    overRatio: "#5978F7",
  };
  const defaultColor = "#F0F0F0"; // Default color for unused time slots

  const parseTime = (time) => {
    const [hour, minute] = time.split(":");
    const [min, period] = minute.split(" ");
    const hoursIn24 = (parseInt(hour) % 12) + (period === "PM" ? 12 : 0);
    return hoursIn24 * 60 + parseInt(min);
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${mins.toString().padStart(2, "0")} ${period}`;
  };

  const scheduleMap = scheduling.reduce((acc, { timeRange, typeOf }) => {
    const [start, end] = timeRange.split(" - ").map(parseTime);
    for (let i = start; i < end; i += 15) {
      acc[i] = { typeOf };
    }
    return acc;
  }, {});

  const generateCards = () => {
    const cards = [];
    for (let time = startTime; time <= endTime; time += 15) {
      const schedule = scheduleMap[time] || { typeOf: null };
      let boxColor = colorMapping[schedule.typeOf] || defaultColor;
      const isHourStart = time % 60 === 0;

      // Skip default color boxes for "teacherSchedule"
      if (scheduleType === "staffSchedule" && boxColor === defaultColor) {
        boxColor = "#FFFFFF";
        // continue;
      }

      cards.push(
        <div
          key={time}
          className="d-flex flex-column align-items-center text-center mr2"
          style={{ position: "relative" }}
        >
          <div
            style={{
              width: "18px",
              height: "19px",
              background: boxColor,
              borderRadius: "8px",
            }}
            title={schedule.typeOf || "No Type"} // Tooltip to display the type
          ></div>
          {isHourStart && boxColor !== "#FFFFFF" && (
            <div
              className="label-11-400"
              style={{
                position: "absolute",
                bottom: "8px",
              }}
            >
              {formatTime(time)}
            </div>
          )}
        </div>
      );
    }
    return cards;
  };

  return (
    <div
      className="d-flex"
      style={{
        overflowX: "auto",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        scrollbarWidth: "none",
        paddingLeft: 15,
      }}
    >
      <style>
        {`
          .d-flex::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      {generateCards()}
    </div>
  );
};

export default CardGrid;
