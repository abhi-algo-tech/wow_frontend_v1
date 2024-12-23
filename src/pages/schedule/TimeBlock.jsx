import React from "react";

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

const containerStyle = {
  width: 198,
  height: 287,
  left: 126,
  top: 89,
  position: "absolute",
  gap: 5,
  ...boxStyle,
};

const sectionStyle = (background, borderRadius, height) => ({
  background,
  borderRadius,
  height,
  ...boxStyle,
});

const textStyle = (color, fontSize, fontWeight) => ({
  color,
  fontSize,
  fontWeight,
  wordWrap: "break-word",
});

const TimeBlock = () => (
  <div style={containerStyle}>
    {/* First Section */}
    <div style={sectionStyle("#DFEAFE", "16px 16px 4px 4px", 123)}>
      <div style={{ ...sectionStyle(null, null, 80), padding: 28 }}>
        <div style={textStyle("#465CB3", 14, "800")}>1-Blue-D</div>
        <div style={textStyle("#424242", 14, "500")}>07:00 AM - 12:00 PM</div>
      </div>
    </div>

    {/* Second Section (Lunch Break) */}
    <div style={sectionStyle("#FEF1C7", "4px", "auto")}>
      <div style={{ ...sectionStyle(null, null, 40), padding: 1 }}>
        <div style={{ width: 182 }}>
          <span style={textStyle("#424242", 12, "700")}>🍝 Lunch Break</span>
          <span style={textStyle("#424242", 12, "500")}>12:00-12:30 PM</span>
        </div>
      </div>
    </div>

    {/* Third Section */}
    <div style={sectionStyle("#DFEAFE", "4px 4px 16px 16px", 123)}>
      <div style={{ ...sectionStyle(null, null, 80), padding: 42 }}>
        <div style={{ width: 100 }}>
          {/* <span style={textStyle("#424242", 12, "700")}>🍝 Lunch Break</span>
          <span style={textStyle("#424242", 12, "500")}>12:00-12:30 PM</span> */}
        </div>
      </div>
    </div>
  </div>
);

export default TimeBlock;
