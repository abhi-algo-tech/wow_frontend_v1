import React from "react";

const TimeBlock1 = ({ name, timeRange, backgroundColor }) => (
  <div
    style={{
      background: backgroundColor,
      borderRadius: "4px",
      padding: "8px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <div style={{ color: "#465CB3", fontSize: 14, fontWeight: "800" }}>
      {name}
    </div>
    <div style={{ color: "#424242", fontSize: 12, fontWeight: "500" }}>
      {timeRange}
    </div>
  </div>
);

export default TimeBlock1;
