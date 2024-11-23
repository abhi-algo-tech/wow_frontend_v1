import React, { useState } from "react";
import { Tabs, Row, Col } from "antd";
import StudentProfileTab from "./StudentAboutTab";
import StudentHealthTab from "./StudentHealthTab";
import ImportantDates from "./ImportantDates";
import Schedule from "./Schedule";
import Document from "./Document";
import Events from "../classroom/Events";
import StudentProfileCardv1 from "./StudentProfileCardv1";

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState("1");

  // Function to handle tab change
  const onTabChange = (key) => setActiveTab(key);

  // Tab content components
  const tabContentComponents = {
    1: <StudentProfileTab />,
    2: <StudentHealthTab />,
    3: <ImportantDates />,
    4: <Schedule />,
    5: <Document />,
  };

  // Tab items configuration
  const tabItems = [
    { key: "1", label: "Overview" },
    { key: "2", label: "Health" },
    { key: "3", label: "Important Dates" },
    { key: "4", label: "Schedule" },
    { key: "5", label: "Document" },
  ].map(({ key, label }) => ({
    key,
    label: <span className="text-left classroom-headertab-text">{label}</span>,
    children: (
      <Row className="mt20" gutter={[20, 10]}>
        <Col span={17}>{tabContentComponents[key]}</Col>
        <Col span={7}>
          <StudentProfileCardv1 />
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
