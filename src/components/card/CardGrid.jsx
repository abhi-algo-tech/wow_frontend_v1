import { Tooltip } from "antd";
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
  const getTooltipContent = (day, schoolName) => {
    return (
      <>
        <div
          style={{
            padding: "6px",
          }}
          className="gap6"
        >
          <div className="d-flex justify-content-between mb6 align-items-center gap-2">
            <div className="label-12-500">{day}</div>
            <div className="">
              <span className="label-14-600">{schoolName}</span>
            </div>
          </div>
          <div className="d-flex justify-content-between mb6 align-items-center gap-2">
            <div className="label-10-400">12:30 AM-01:00 PM </div>
            <div className="scheduling-tag-status">
              <span className="label-10-400 text-white">Under ratio</span>
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            {[
              {
                color: "#9BE8FF",
                label: "Expected Students",
                backgroundColor: "rgba(154, 232, 255, 0.30)",
                value: 12,
              },
              {
                color: "#FDCD16",
                label: "Required Staff",
                backgroundColor: "rgba(253, 205, 22, 0.3)",
                value: 3,
              },
              {
                color: "#9C84FF",
                label: "Scheduled Staff",
                backgroundColor: "rgba(156, 132, 255, 0.30)",
                value: 2,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center gap-2">
                  <div
                    style={{
                      width: "9px",
                      height: "9px",
                      background: item.color,
                      borderRadius: "50%",
                    }}
                  ></div>
                  <div className="text-muted small font-weight-normal">
                    {item.label}
                  </div>
                </div>
                <div
                  className="d-flex justify-content-center align-items-center rounded"
                  style={{
                    width: "20px",
                    height: "20px",
                    background: item.backgroundColor,
                    borderBottom: "1px solid",
                  }}
                >
                  <div className="text-dark small font-weight-medium">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="text-end">
          <Link to={"/schedule/classroomview"}>
            <span className="label-10-500 pointer">Show More</span>
          </Link>
        </div> */}
      </>
    );
  };
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
          <Tooltip
            color="#fff"
            key={"23 Dec"}
            overlayStyle={{
              borderRadius: 8,
              border: "1px solid rgba(22, 40, 49, 0.10)",
              background: "#FFF",
              width: 210,
              gap: 6,
              alignItems: "flex-start",
            }}
            title={getTooltipContent("Mon,23 Dec", "1-Blue-D")}
            className="no-border-tag pointer"
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
          </Tooltip>

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
