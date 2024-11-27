import React from "react";
import { Progress } from "antd";
import { styled } from "styled-components";

const ProgressBarClassroomOverview = ({
  title1 = "Active",
  title2 = "Upcoming",
  activeStudents,
  upcomingStudents,
  totalStudents,
  rounded = false,
  gradient = false,
  strokeWidth = 16,
  strokeLinecap = "square",
  activeColor = "#7dd3fc",
  inActiveColor = "#fdcd16",
}) => {
  // Calculate percentages for active and upcoming students
  const activePercent = (activeStudents / totalStudents) * 100;
  const upcomingPercent = (upcomingStudents / totalStudents) * 100;
  // Styled component for custom progress bar
  const StyledProgress = styled(Progress)`
    .ant-progress-bg {
      background-color: ${({ gradient }) =>
        gradient
          ? `linear-gradient(90deg, #9be8ff, ${inActiveColor})`
          : `${inActiveColor}`} !important;
      border-radius: ${({ rounded }) => (rounded ? "50px" : "0px")} !important;
    }
    .ant-progress-success-bg {
      background-color: ${({ gradient }) =>
        gradient
          ? `linear-gradient(90deg, ${activeColor}, #9be8ff)`
          : `${activeColor}`} !important;
      border-radius: 0px;
    }
    .ant-progress-outer {
      border-radius: ${({ rounded }) => (rounded ? "50px" : "0px")} !important;
    }
  `;

  return (
    <>
      <StyledProgress
        percent={100}
        success={{
          percent: activePercent,
        }}
        // trailColor="#e5e7eb"
        showInfo={false}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        rounded={rounded}
        gradient={gradient}
        className="w-full max-w-md"
      />
      <div className="d-flex justify-content-between align-items-center">
        <span
          className="active-ellipse"
          style={{ backgroundColor: activeColor }}
        ></span>
        <span className="classroom-bar-text">
          {title1} ({activeStudents})
        </span>
        <span
          className="upcomming-ellipse"
          style={{ backgroundColor: inActiveColor }}
        ></span>
        <span className="classroom-bar-text">
          {title2} ({upcomingStudents})
        </span>
      </div>
    </>
  );
};

export default ProgressBarClassroomOverview;
