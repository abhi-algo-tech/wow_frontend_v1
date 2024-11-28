import React from "react";

export default function CustomCircle({ number = 1, color = "#FF7B7B", hours }) {
  return (
    <div style={{ "--circle-color": color }}>
      <div className="custom-circle">
        <span className="circle-number" style={{ "--text-color": color }}>
          {number}
          {hours && <span style={{ fontSize: 12 }}>h</span>}
        </span>
      </div>
    </div>
  );
}
