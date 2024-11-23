import React, { useEffect, useState } from "react";
import { Menu, Divider } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineBook,
  AiOutlineUser,
  AiOutlineSchedule,
  AiOutlineMail,
  AiOutlineDollarCircle,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineBell,
} from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";

const items = [
  {
    key: "1",
    icon: <AiOutlineDashboard />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },

  {
    key: "2",
    icon: <SiGoogleclassroom />,
    label: <Link to="/classroom">Classroom</Link>,
    children: [
      { key: "2.1", label: <Link to="/classroom">My Classroom</Link> },
      {
        key: "2.2",
        label: <Link to="/classroom-profile">Classroom Profile</Link>,
      },
    ],
  },
  {
    key: "3",
    icon: <AiOutlineUser />,
    label: <Link to="/students">Students</Link>,
    children: [
      { key: "3.1", label: <Link to="/classroom">Create</Link> },
      { key: "3.2", label: <Link to="/profile">View Profile</Link> },
      { key: "3.3", label: <Link to="/attendance">Attendance</Link> },
      { key: "3.4", label: <Link to="/classroom">Tagging</Link> },
      { key: "3.5", label: <Link to="/daily-activity">Activities</Link> },
    ],
  },
  {
    key: "4",
    icon: <AiOutlineUser />,
    label: <Link to="/StaffOverView">Staff</Link>,
    children: [
      { key: "4.1", label: <Link to="/staff">Create</Link> },
      { key: "4.2", label: <Link to="/staff-profile">Profile</Link> },
      { key: "4.3", label: <Link to="/classroom">Attendence</Link> },
    ],
  },
  {
    key: "5",
    icon: <AiOutlineSchedule />,
    label: <Link to="/scheduling">Scheduling</Link>,
  },
  {
    key: "6",
    icon: <AiOutlineMail />,
    label: <Link to="/communication">Communication</Link>,
  },
  {
    key: "7",
    icon: <AiOutlineDollarCircle />,
    label: <Link to="/billing">Billing</Link>,
  },
  {
    key: "8",
    icon: <AiOutlineBarChart />,
    label: <Link to="/future-enrollment">Future Enrollment</Link>,
  },
  {
    key: "9",
    icon: <AiOutlineBarChart />,
    label: <Link to="/report">Report</Link>,
  },
  {
    key: "10",
    icon: <AiOutlineSetting />,
    // label: <SettingDrawer />,
    label: "Settings",
  },
  {
    key: "11",
    icon: <AiOutlineBell />,
    label: <Link to="/notifications">Notifications</Link>,
  },
];

function SideNavbarMobile({ collapsed, setDrawerVisible }) {
  const [lastactiveKey, setLastActiveKey] = useState("1");
  const location = useLocation();
  const selectedKey =
    items.find((item) => location.pathname.startsWith(item.label.props.to))
      ?.key || "1";

  useEffect(() => {
    setLastActiveKey(selectedKey);
    if (setDrawerVisible) {
      // Ensure the function is defined
      setDrawerVisible(false);
    }
  }, [selectedKey, setDrawerVisible]);

  return (
    <>
      <Divider />
      <Menu
        selectedKeys={[selectedKey]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
      />
    </>
  );
}

export default SideNavbarMobile;
