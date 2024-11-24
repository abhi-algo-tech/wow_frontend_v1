import React from "react";

export default function CustomCircle({ number = 1, color = "#FF7B7B" }) {
  return (
    <div
      className="custom-circle-container"
      style={{ "--circle-color": color }}
    >
      <div className="custom-circle">
        <span className="circle-number">{number}</span>
        <div className="circle-smile"></div>
      </div>
    </div>
  );
}
