import { useEffect, useState } from "react";
import { SearchOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Layout, Input, Badge, Dropdown, Space, Avatar, Button } from "antd";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useGetAllSchools } from "../hooks/useSchool";

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

  const { data: schools, isLoading, isError, error } = useGetAllSchools();

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
    items: schools?.data?.map((school) => ({
      key: school.id.toString(), // Convert id to string as keys are typically strings
      label: school.name, // Use the name property for the label
    })),
  };

  const [selectedAcademy, setSelectedAcademy] = useState();
  const [selectedLabel, setSelectedLabel] = useState();

  useEffect(() => {
    // Check sessionStorage for previous selection
    const savedAcademyKey = sessionStorage.getItem("selectedAcademy");
    const savedAcademyLabel = sessionStorage.getItem("selectedAcademyLabel");

    if (savedAcademyKey && savedAcademyLabel) {
      setSelectedAcademy(savedAcademyKey);
      setSelectedLabel(savedAcademyLabel);
    } else if (academyMenu.items?.length) {
      // If no sessionStorage values exist, default to the first menu item
      const defaultKey = academyMenu.items[0].key;
      const defaultLabel = academyMenu.items[0].label;

      setSelectedAcademy(defaultKey);
      setSelectedLabel(defaultLabel);

      sessionStorage.setItem("selectedAcademy", defaultKey);
      sessionStorage.setItem("selectedAcademyLabel", defaultLabel);
    }
  }, [academyMenu.items]);

  const handleMenuClick = ({ key }) => {
    const selectedItem = academyMenu.items.find((item) => item.key === key);
    if (selectedItem) {
      setSelectedAcademy(key);
      setSelectedLabel(selectedItem.label);

      // Save to sessionStorage
      sessionStorage.setItem("selectedAcademy", key);
      sessionStorage.setItem("selectedAcademyLabel", selectedItem.label);
    }
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
          menu={{
            items: academyMenu.items,
            onClick: handleMenuClick, // Assign the click handler
          }}
          trigger={["click"]}
          className="school-selection-drpd"
        >
          <a onClick={(e) => e.preventDefault()} style={{ color: "inherit" }}>
            <Space size={14}>
              <span style={{ fontSize: "16px", fontWeight: 500 }}>
                {selectedLabel} {/* Display the currently selected label */}
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
