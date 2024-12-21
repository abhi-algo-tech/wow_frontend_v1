import React from "react";
import TimeBlock from "./TimeBlock";
import { Card } from "antd";

function OverviewTable() {
  const startDate = new Date(2024, 10, 18); // November 18, 2024 (Mon)
  const endDate = new Date(2024, 10, 22); // November 22, 2024 (Fri)

  // Generate the date range from startDate to endDate
  const dateArray = Array.from(
    { length: (endDate - startDate) / (1000 * 3600 * 24) + 1 },
    (_, index) => {
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + index);
      return newDate;
    }
  );
  return (
    <Card className="card-border" styles={{ body: { padding: 0 } }}>
      <div style={{ height: 427, position: "relative" }}>
        <div
          style={{
            height: 387,
            left: 0,
            top: 40,
            position: "absolute",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 16,
            display: "inline-flex",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              height: 387,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 16,
              display: "flex",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                display: "inline-flex",
              }}
            >
              <div className="d-flex flex-column" style={{ width: "119px" }}>
                {Array.from({ length: 14 }, (_, index) => {
                  const time = new Date(0, 0, 0, 5 + index, 0); // Generate times from 6:00 AM to 6:00 PM
                  const timeString = time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <div
                      key={index}
                      className={`d-flex ${
                        index === 0 ? "bg-light" : "border-top"
                      } align-items-center justify-content-center`}
                      style={{
                        height: index === 0 ? "23px" : "26px",
                        padding: "8px 10px",
                        borderBottom:
                          index === 14 ? "none" : "1px #E9ECEF solid",
                        borderLeft: index === 0 ? "none" : "1px #E9ECEF solid",
                        borderRight: index === 0 ? "none" : "1px #E9ECEF solid",
                      }}
                    >
                      <div
                        className={`text-muted ${
                          index === 0
                            ? "font-weight-bold"
                            : "font-weight-normal"
                        }`}
                        style={{
                          fontSize: index === 0 ? "14px" : "12px",
                          fontFamily: "Manrope",
                        }}
                      >
                        {index === 0 ? "Time" : timeString}
                      </div>
                    </div>
                  );
                })}
              </div>

              {dateArray.map((date, index) => (
                <div
                  key={index}
                  style={{
                    width: 200,
                    display: "inline-flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Date Header */}
                  <div
                    style={{
                      alignSelf: "stretch",
                      height: 23,
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingTop: 8,
                      paddingBottom: 8,
                      background: "rgba(249, 245, 250, 0.70)",
                      borderBottom: "1px rgba(44, 98.60, 226, 0.20) solid",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 10,
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        color: "#573353",
                        fontSize: 14,
                        fontFamily: "Manrope",
                        fontWeight: "600",
                        wordWrap: "break-word",
                      }}
                    >
                      {date.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  {/* Date Content */}
                  {Array.from({ length: 14 }, (_, index) => (
                    <div
                      key={index}
                      style={{
                        alignSelf: "stretch",
                        height: 26,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 12,
                        paddingBottom: 12,
                        borderLeft: "1px #F7F7F7 solid",
                        borderRight: "1px #F7F7F7 solid",
                        borderBottom: "1px #F7F7F7 solid",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <TimeBlock />
      </div>
    </Card>
  );
}

export default OverviewTable;
