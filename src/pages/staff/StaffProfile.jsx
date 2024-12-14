import React, { useEffect, useState } from "react";
import { Tabs, Row, Col } from "antd";

import ProfileCardv1 from "../student/ProfileCardv1";
import StaffAbout from "./StaffAbout";
import StaffDocument from "./StaffDocument";
import StaffImportantDates from "./StaffImportantDates";
import { useLocation, useNavigate } from "react-router-dom";

export default function StaffProfile() {
  const [activeTab, setActiveTab] = useState("1");
  const location = useLocation();
  const navigate = useNavigate();
  // const [staff, setStaff] = useState();
  const staffId = location.state?.staffId;
  // const { data: staffData, isLoading, error } = useStaffById(studentId);

  // useEffect(() => {
  //   setStaff(staffData?.data || {});
  // }, [staffData]);
  // Handle missing `state` (e.g., direct URL access)
  useEffect(() => {
    if (!staffId) {
      navigate("/"); // Redirect to home or error page
    }
  }, [staffId, navigate]);
  // Function to handle tab change
  const onTabChange = (key) => setActiveTab(key);

  // Tab content components
  const tabContentComponents = {
    1: <StaffAbout staffId={staffId} />,
    2: <StaffImportantDates />,
    3: <StaffDocument />,
  };

  // Tab items configuration
  const tabItems = [
    { key: "1", label: "Profile" },
    { key: "2", label: "Important Dates" },
    { key: "3", label: "Document" },
  ].map(({ key, label }) => ({
    key,
    label: <span className="text-left classroom-headertab-text">{label}</span>,
    children: (
      <Row className="mt20" gutter={[20, 10]}>
        <Col span={17}>{tabContentComponents[key]}</Col>
        <Col span={7}>
          <ProfileCardv1 role="staff" />
          <div className="mt18">{/* <Events /> */}</div>
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
