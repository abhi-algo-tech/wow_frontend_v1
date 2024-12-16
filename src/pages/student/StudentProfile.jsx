import React, { useEffect, useState } from "react";
import { Tabs, Row, Col } from "antd";
import StudentProfileTab from "./StudentAboutTab";
import StudentHealthTab from "./StudentHealthTab";
import ImportantDates from "./ImportantDates";
import Schedule from "./Schedule";
import Document from "./Document";
import Events from "../classroom/Events";
import ProfileCardv1 from "./ProfileCardv1";
import { useLocation, useNavigate } from "react-router-dom";
import { useStudentById } from "../../hooks/useStudent";

export default function StudentProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isstudentData, setStudentData] = useState();
  // Extract `studentId` from state
  const studentId = location.state?.studentId;
  const { data: studentData, isLoading, error } = useStudentById(studentId);

  useEffect(() => {
    setStudentData(studentData?.data || {});
  }, [studentData]);
  // Handle missing `state` (e.g., direct URL access)
  useEffect(() => {
    if (!studentId) {
      navigate("/"); // Redirect to home or error page
    }
  }, [studentId, navigate]);

  const [activeTab, setActiveTab] = useState("1");

  // Function to handle tab change
  const onTabChange = (key) => setActiveTab(key);

  // Tab content components
  const tabContentComponents = {
    1: <StudentProfileTab studentId={studentId} />,
    2: <StudentHealthTab isstudentData={isstudentData} studentId={studentId} />,
    3: <ImportantDates studentId={studentId} />,
    // 4: <Schedule />,
    4: <Document studentId={studentId} />,
  };

  // Tab items configuration
  const tabItems = [
    { key: "1", label: "Overview" },
    { key: "2", label: "Health" },
    { key: "3", label: "Important Dates" },
    // { key: "4", label: "Schedule" },
    { key: "4", label: "Document" },
  ].map(({ key, label }) => ({
    key,
    label: <span className="text-left classroom-headertab-text">{label}</span>,
    children: (
      <Row className="mt20" gutter={[20, 10]}>
        <Col span={17}>{tabContentComponents[key]}</Col>
        <Col span={7}>
          <ProfileCardv1 Id={studentId} role="student" />
          <div className="mt18">
            <Events />
          </div>
        </Col>
      </Row>
    ),
  }));

  return (
    <Tabs
      defaultActiveKey="1"
      items={tabItems}
      className="custom-classroom-tab-style"
      tabPosition="top"
      onChange={onTabChange}
      style={{ border: "none" }}
    />
  );
}
