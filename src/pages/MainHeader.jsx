import { useState } from "react";
import { SearchOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Layout, Input, Badge, Dropdown, Space, Avatar, Button } from "antd";
import { AiOutlineMenuUnfold } from "react-icons/ai";

const { Header } = Layout;

function MainHeader({
  setDrawerVisible,
  setCollapsed,
  drawerVisible,
  collapsed,
  isMobile,
}) {
  const toggleCollapsed = () => {
    if (isMobile) {
      setDrawerVisible(!drawerVisible);
    } else {
      setCollapsed(!collapsed);
    }
  };
  const [searchValue, setSearchValue] = useState("");

  const profileMenu = {
    items: [
      {
        key: "1",
        label: "Profile",
      },
      {
        key: "2",
        label: "Settings",
      },
      {
        key: "3",
        label: "Logout",
      },
    ],
  };

  const academyMenu = {
    items: [
      {
        key: "1",
        label: "Joy Academy",
      },
      {
        key: "2",
        label: "WOW Academy",
      },
      {
        key: "3",
        label: "Happy Academy",
      },
    ],
  };
  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {isMobile ? (
        <Button
          type="primary"
          onClick={toggleCollapsed}
          className="toggle-header-button"
        >
          <AiOutlineMenuUnfold />
        </Button>
      ) : null}

      {/* Left Section - Academy Name */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Dropdown
          menu={academyMenu}
          trigger={["click"]}
          className="school-selection-drpd"
        >
          <a onClick={(e) => e.preventDefault()} style={{ color: "inherit" }}>
            <Space size={14}>
              <span style={{ fontSize: "16px", fontWeight: 500 }}>
                Kidi Academy
              </span>
              <CaretDownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>

      {/* Center Section - Search Bar */}
      <div className={`search-bar ${isMobile ? "hidden" : "flex"}`}>
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined style={{ color: "#666" }} />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="globle-search"
        />
      </div>

      {/* Right Section - Icons and Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: "23px" }}>
        <Badge offset={[0, 0]} className="custom-badge">
          <img
            src="/wow_icons/png/shedule_calender.png"
            style={{ width: 22, height: 18 }}
          />
        </Badge>
        <Badge count={5} offset={[0, 0]} className="custom-badge">
          <img src="/wow_icons/png/chat.png" />
        </Badge>
        <Badge count={2} offset={[0, 0]} className="custom-badge">
          <img src="/wow_icons/png/bell_notification.png" />
        </Badge>
        <Dropdown menu={profileMenu} trigger={["click"]}>
          <Space className="cursor-pointer">
            <img
              src="/wow_images/person1.png"
              alt="Anna Smith"
              style={{ marginLeft: "8px", width: 40, height: 40 }}
            />
            <div className={`profile-info ${isMobile ? "hidden" : "flex"}`}>
              <span className="profile-name">Anna Smith</span>
              <br />
              <span className="active-role">Admin</span>
            </div>
            <CaretDownOutlined className="pointer" />
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
}

export default MainHeader;
