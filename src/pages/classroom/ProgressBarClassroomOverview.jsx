import React from "react";
import { Progress } from "antd";
import { styled } from "styled-components";

// Styled component for custom progress bar
const StyledProgress = styled(Progress)`
  .ant-progress-bg {
    background-color: ${({ gradient }) =>
      gradient
        ? "linear-gradient(90deg, #9be8ff, #fdcd16)"
        : "#fdcd16"} !important;
    border-radius: ${({ rounded }) => (rounded ? "50px" : "0px")} !important;
  }
  .ant-progress-success-bg {
    background-color: ${({ gradient }) =>
      gradient
        ? "linear-gradient(90deg, #7dd3fc, #9be8ff)"
        : "#7dd3fc"} !important;
  }
  .ant-progress-outer {
    border-radius: ${({ rounded }) => (rounded ? "50px" : "0px")} !important;
  }
`;

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
}) => {
  // Calculate percentages for active and upcoming students
  const activePercent = (activeStudents / totalStudents) * 100;
  const upcomingPercent = (upcomingStudents / totalStudents) * 100;

  return (
    <>
      <StyledProgress
        percent={100}
        success={{
          percent: activePercent,
        }}
        trailColor="#e5e7eb"
        showInfo={false}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        rounded={rounded}
        gradient={gradient}
        className="w-full max-w-md"
      />
      <div className="d-flex justify-content-between align-items-center">
        <span className="active-ellipse"></span>
        <span className="classroom-bar-text">
          {title1} ({activeStudents})
        </span>
        <span className="upcomming-ellipse"></span>
        <span className="classroom-bar-text">
          {title2} ({upcomingStudents})
        </span>
      </div>
    </>
  );
};

export default ProgressBarClassroomOverview;
