import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useNavigate from "../hooks/useNavigate";

const { Sider } = Layout;

const menuItems = [
  {
    key: "dashboard",
    icon: <img src="/wow_icons/png/Dashboard.png" width={22} height={22} />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: "classroom",
    icon: <img src="/wow_icons/png/Dashboard-1.png" width={22} height={22} />,
    label: <Link to="/classroom">Classroom</Link>,
  },
  {
    key: "student",
    icon: <img src="/wow_icons/png/Students.png" width={22} height={22} />,
    label: <Link to="/student">Students</Link>,
  },
  {
    key: "staff",
    icon: <img src="/wow_icons/png/Staff.png" width={22} height={18} />,
    label: <Link to="/staff">Staff</Link>,
  },
  {
    key: "attendance",
    icon: <img src="/wow_icons/png/Attendance.png" width={22} height={22} />,
    label: "Attendance",
    children: [
      {
        key: "student-attendance",
        icon: (
          <img
            src="/sub_menu_icons/png/Student Attendance.png"
            className="custom-submenu-icons"
          />
        ),

        label: <Link to="/attendance/student">Student Attendance</Link>,
      },
      {
        key: "staff-attendance",
        icon: (
          <img
            src="/sub_menu_icons/png/Staff Attendance.png"
            className="custom-submenu-icons"
          />
        ),
        label: <Link to="/attendance/staff">Staff Attendance</Link>,
      },
    ],
  },
  {
    key: "activities",
    icon: <img src="/wow_icons/png/Activities.png" width={22} height={22} />,
    label: "Activities",
    children: [
      {
        key: "daily-summary",
        icon: (
          <img
            src="/sub_menu_icons/png/Daily-Summary.png"
            className="custom-submenu-icons"
          />
        ),
        label: <Link to="/activities/daily">Daily Summary</Link>,
      },
      {
        key: "all-activities",
        icon: (
          <img
            src="/sub_menu_icons/png/All-Activities.png"
            className="custom-submenu-icons"
          />
        ),

        label: <Link to="/activities/all">All Activities</Link>,
      },
    ],
  },
  {
    key: "communication",
    icon: <img src="/wow_icons/png/Communication.png" width={22} height={22} />,
    label: "Communication",
    children: [
      {
        key: "newsletter",
        icon: (
          <img
            src="/sub_menu_icons/png/Newsletter.png"
            className="custom-submenu-icons"
          />
        ),
        label: <Link to="/communication/newsletter">Newsletter</Link>,
      },
      {
        key: "parent-messaging",
        icon: (
          <img
            src="/sub_menu_icons/png/Parent Messaging.png"
            className="custom-submenu-icons"
          />
        ),
        label: <Link to="/communication/parent">Parent Messaging</Link>,
      },
      {
        key: "staff-messaging",
        icon: (
          <img
            src="/sub_menu_icons/png/Staff Messaging.png"
            className="custom-submenu-icons"
          />
        ),

        label: <Link to="/communication/staff">Staff Messaging</Link>,
      },
    ],
  },
  {
    key: "scheduling",
    icon: <img src="/wow_icons/png/Scheduling.png" width={22} height={22} />,
    label: "Scheduling",
    children: [
      {
        key: "staff-schedule",
        icon: (
          <img
            src="/sub_menu_icons/png/Staff Schedule.png"
            className="custom-submenu-icons"
          />
        ),

        label: (
          <Link to="/scheduling/staff-schedule-overview">Staff Schedule</Link>
        ),
      },
      {
        key: "classroom-schedule",
        icon: (
          <img
            src="/sub_menu_icons/png/Classroom Schedule.png"
            className="custom-submenu-icons"
          />
        ),
        label: <Link to="/schedule">Classroom Schedule</Link>,
      },
    ],
  },
  {
    key: "billing",
    icon: <img src="/wow_icons/png/Billing.png" width={17} height={22} />,
    label: "Billing",
    children: [
      {
        key: "billing-overview",
        icon: (
          <img
            src="/sub_menu_icons/png/Overview.png"
            className="custom-submenu-icons"
          />
        ),
        label: <Link to="/billing/overview">Overview</Link>,
      },
      {
        key: "billing-plans",
        icon: (
          <img
            src="/sub_menu_icons/png/Plan.png"
            className="custom-submenu-icons"
          />
        ),

        label: <Link to="/billing/plans">Plans</Link>,
      },
      {
        key: "billing-transactions",
        icon: (
          <img
            src="/sub_menu_icons/png/Transactions.png"
            className="custom-submenu-icons"
          />
        ),

        label: <Link to="/billing/transactions">Transactions</Link>,
      },
      {
        key: "billing-subsidies",
        icon: (
          <img
            src="/sub_menu_icons/png/subsidies.png"
            className="custom-submenu-icons"
          />
        ),

        label: <Link to="/billing/subsidies">Subsidies</Link>,
      },
    ],
  },
  {
    key: "more",
    icon: <img src="/wow_icons/png/More.png" width={22} height={22} />,
    label: "More",
    children: [
      {
        key: "enrollments",

        icon: (
          <img
            src="/sub_menu_icons/png/Enrollments.png"
            className="custom-submenu-icons"
          />
        ),
        label: "Enrollments",
        children: [
          {
            key: "enrollments-overview",

            label: <Link to="/enrollments/overview">Overview</Link>,
          },
          {
            key: "movements-rules",
            label: <Link to="/enrollments/movements">Movements & Rules</Link>,
          },
          {
            key: "availability",
            label: <Link to="/enrollments/availability">Availability</Link>,
          },
        ],
      },
      {
        key: "inventory",
        icon: (
          <img
            src="/sub_menu_icons/png/Inventory.png"
            className="custom-submenu-icons"
          />
        ),
        label: "Inventory",
        children: [
          {
            key: "inventory-overview",
            label: <Link to="/inventory/overview">Overview</Link>,
          },
          {
            key: "products",
            label: <Link to="/inventory/products">Products</Link>,
          },
          {
            key: "vendors",
            label: <Link to="/inventory/vendors">Vendors</Link>,
          },
          {
            key: "requests",
            label: <Link to="/inventory/requests">Requests</Link>,
          },
          {
            key: "purchases",
            label: <Link to="/inventory/purchases">Purchases</Link>,
          },

          {
            key: "stock",
            label: <Link to="/inventory/stock">Stock</Link>,
          },
        ],
      },
      {
        key: "events-todo",
        icon: (
          <img
            src="/sub_menu_icons/png/Events & To-do.png"
            className="custom-submenu-icons"
          />
        ),
        label: "Events & To-do",
        children: [
          {
            key: "events-calendar",
            label: <Link to="/events/calendar">Events Calendar</Link>,
          },
          { key: "tasks", label: <Link to="/events/tasks">Tasks</Link> },
        ],
      },
    ],
  },
  {
    key: "settings",
    icon: (
      <img
        src="/sub_menu_icons/png/Setting.png"
        className="custom-submenu-icons"
      />
    ),
    label: "Settings",
    children: [
      {
        key: "school-settings",

        label: <Link to="/settings/school">School Settings</Link>,
      },
      {
        key: "permissions",

        label: <Link to="/settings/permissions">Permissions</Link>,
      },
    ],
  },
];
function MainMenu() {
  const [collapsed, setCollapsed] = useState(true);
  const { pathname } = useLocation(); // Current route
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  // Find keys for active menu items
  const findKeys = (items, parentKey = null) => {
    for (const item of items) {
      if (item.children) {
        const childKeys = findKeys(item.children, item.key);
        if (childKeys) return childKeys;
      }

      if (
        React.isValidElement(item.label) &&
        item.label.props &&
        item.label.props.to === location.pathname
      ) {
        return { selectedKey: item.key, parentKey };
      }
    }
    return null;
  };

  useEffect(() => {
    const activeKeys = findKeys(menuItems);
    if (activeKeys) {
      setSelectedKeys([activeKeys.selectedKey]);
      setOpenKeys(activeKeys.parentKey ? [activeKeys.parentKey] : []);
    }
  }, [location.pathname]);

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };
  return (
    <Sider
      width={93}
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="sidebar-logo">
        <img src="/wow_icons/png/logo.png" alt="Logo" width={79} height={75} />
        {!collapsed && <div className="sidebar-title">Wow! Care</div>}
      </div>
      <div className="menu-scroll-container">
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          items={menuItems}
          className="custom-menu"
        />
      </div>
    </Sider>
  );
}

export default MainMenu;
