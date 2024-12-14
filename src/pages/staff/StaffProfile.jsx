import React, { useEffect, useState } from "react";
import { Tabs, Row, Col } from "antd";

import ProfileCardv1 from "../student/ProfileCardv1";
import StaffAbout from "./StaffAbout";
import StaffDocument from "./StaffDocument";
import StaffImportantDates from "./StaffImportantDates";
import { useLocation, useNavigate } from "react-router-dom";
import { useStaffById } from "../../hooks/useStaff";

export default function StaffProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [staffData, setStadffData] = useState();
  const [activeTab, setActiveTab] = useState("1");
  // debugger;
  const staffId = location.state?.staffId;
  console.log("staffId", staffId);

  // Extract `staffId` from state
  const { data: staffDatas, isLoading, error } = useStaffById(staffId);
  // Function to handle tab change
  useEffect(() => {
    setStadffData(staffDatas?.data || {});
  }, [staffDatas]);
  // Handle missing `state` (e.g., direct URL access)
  useEffect(() => {
    if (!staffId) {
      navigate("/"); // Redirect to home or error page
    }
  }, [staffId, navigate]);
  const onTabChange = (key) => setActiveTab(key);
  console.log("staffData", staffData);

  // Tab content components
  const tabContentComponents = {
    1: <StaffAbout />,
    2: <StaffImportantDates staffData={staffData} />,
    3: <StaffDocument staffData={staffData} />,
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
