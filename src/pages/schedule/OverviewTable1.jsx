import React from "react";
import TimeBlock from "./TimeBlock";

export const scheduleData = {
  weekDays: [
    {
      date: "Mon, Nov 18",
      schedule: [
        {
          type: "class",
          name: "1-Blue-D",
          timeRange: "07:00 AM - 12:00 PM",
          backgroundColor: "#DFEAFE",
        },
        {
          type: "break",
          name: "🍝 Lunch Break",
          timeRange: "12:00-12:30 PM",
          backgroundColor: "#FEF1C7",
        },
        {
          type: "class",
          name: "1-Blue-D",
          timeRange: "12:30 PM - 05:00 PM",
          backgroundColor: "#DFEAFE",
        },
      ],
    },
    {
      date: "Tue, Nov 19",
      schedule: [
        {
          type: "class",
          name: "1-Blue-D",
          timeRange: "07:00 AM - 12:00 PM",
          backgroundColor: "#DFEAFE",
        },
        {
          type: "break",
          name: "🍝 Lunch Break",
          timeRange: "12:00-12:30 PM",
          backgroundColor: "#FEF1C7",
        },
        {
          type: "class",
          name: "1-Blue-D",
          timeRange: "12:30 PM - 05:00 PM",
          backgroundColor: "#DFEAFE",
        },
      ],
    },
    {
      date: "Wed, Nov 20",
      schedule: [
        {
          type: "class",
          name: "1-Blue-D",
          timeRange: "07:00 AM - 12:00 PM",
          backgroundColor: "#DFEAFE",
        },
        {
          type: "break",
          name: "🍝 Lunch Break",
          timeRange: "12:00-12:30 PM",
          backgroundColor: "#FEF1C7",
        },
        {
          type: "leave",
          name: "Half Day Leave",
          timeRange: "12:30 PM - 05:00 PM",
          backgroundColor: "#FFF3E0",
        },
      ],
    },
    {
      date: "Thu, Nov 21",
      schedule: [
        {
          type: "class",
          name: "1-Blue-D",
          timeRange: "07:00 AM - 12:00 PM",
          backgroundColor: "#DFEAFE",
        },
        {
          type: "break",
          name: "🍝 Lunch Break",
          timeRange: "12:00-12:30 PM",
          backgroundColor: "#FEF1C7",
        },
        {
          type: "class",
          name: "1-Blue-D",
          timeRange: "12:30 PM - 05:00 PM",
          backgroundColor: "#DFEAFE",
        },
      ],
    },
    {
      date: "Fri, Nov 22",
      schedule: [
        {
          type: "class",
          name: "1-Blue-D",
          timeRange: "07:00 AM - 12:00 PM",
          backgroundColor: "#DFEAFE",
        },
        {
          type: "break",
          name: "🍝 Lunch Break",
          timeRange: "12:00-12:30 PM",
          backgroundColor: "#FEF1C7",
        },
        {
          type: "class",
          name: "1-Blue-D",
          timeRange: "12:30 PM - 05:00 PM",
          backgroundColor: "#DFEAFE",
        },
      ],
    },
  ],
  timeSlots: [
    "05:00 AM",
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
  ],
};

function OverviewTable1() {
  const timeSlots = scheduleData.timeSlots;

  return (
    <div className="card">
      <div style={{ height: 427, position: "relative" }}>
        <div
          style={{
            height: 387,
            left: 0,
            top: 40,
            position: "absolute",
            display: "inline-flex",
          }}
        >
          {/* Time Column */}
          <div className="d-flex flex-column" style={{ width: "119px" }}>
            {timeSlots.map((time, index) => (
              <div
                key={index}
                className={`d-flex ${
                  index === 0 ? "bg-light" : "border-top"
                } align-items-center justify-content-center`}
                style={{
                  height: index === 0 ? "23px" : "26px",
                  padding: "8px 10px",
                  borderBottom:
                    index === timeSlots.length ? "none" : "1px #E9ECEF solid",
                }}
              >
                <div
                  className={`text-muted ${
                    index === 0 ? "font-weight-bold" : "font-weight-normal"
                  }`}
                  style={{
                    fontSize: index === 0 ? "14px" : "12px",
                  }}
                >
                  {index === 0 ? "Time" : time}
                </div>
              </div>
            ))}
          </div>

          {/* Date Columns */}
          {scheduleData.weekDays.map((day, dayIndex) => (
            <div
              key={dayIndex}
              style={{
                width: 200,
                display: "inline-flex",
                flexDirection: "column",
              }}
            >
              {/* Date Header */}
              <div
                style={{
                  height: 23,
                  padding: "8px 10px",
                  background: "rgba(249, 245, 250, 0.70)",
                  borderBottom: "1px rgba(44, 98.60, 226, 0.20) solid",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "#573353",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {day.date}
                </div>
              </div>

              {/* Schedule Below Date */}
              <div
                style={{
                  padding: "8px 10px",
                  background: "#f0f8ff",
                  borderBottom: "1px solid #e9ecef",
                }}
              >
                {day.schedule.map((scheduleForRow, index) => (
                  <TimeBlock
                    key={index}
                    name={scheduleForRow.name}
                    timeRange={scheduleForRow.timeRange}
                    backgroundColor={scheduleForRow.backgroundColor}
                  />
                ))}
              </div>

              {/* Time Slots */}
              {timeSlots.map((timeSlot, rowIndex) => (
                <div
                  key={rowIndex}
                  style={{
                    height: 26,
                    padding: "0 10px",
                    borderLeft: "1px #F7F7F7 solid",
                    borderRight: "1px #F7F7F7 solid",
                    borderBottom: "1px #F7F7F7 solid",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Render empty div for time slots */}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OverviewTable1;
