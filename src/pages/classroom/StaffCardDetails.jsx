import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Input, Select } from "antd";

import { SearchOutlined } from "@ant-design/icons";
import ActorBigCard from "../../components/ActorBigCard";
import CommonModalComponent from "../../components/CommonModalComponent";
import CreateMessage from "../../components/message/CreateMessage";
const { Option } = Select;

// Sample student data
const staffs = [
  {
    id: 1,
    name: "Aadhira",
    avatar: "/classroom_icons/png/Aadhira.png",
    flags: ["mail"],
    status: "",
    designation: "Admin",
  },
  {
    id: 2,
    name: "Aarav",
    avatar: "/classroom_icons/png/Aarav.png",
    flags: ["mail"],
    status: "",
    designation: "Staff",
  },
  {
    id: 3,
    name: "Aarjav",
    avatar: "/classroom_icons/png/Aarjav.png",
    flags: ["mail"],
    status: "",
    designation: "Lead Teacher",
  },
];

const leftRenderData = [
  { icon: "/classroom_icons/png/Sign in.png", label: "Sign In" },
  { icon: "/classroom_icons/png/Sign out.png", label: "Sign Out" },
  { icon: "/classroom_icons/png/transfer.png", label: "Transfer" },
  { icon: "/classroom_icons/png/Mark absent.png", label: "Absent" },
];
const rightRenderData = [
  {
    icon: "/wow_icons/png/Attendance.png",
    label: "Attendance",
    modal: "Attendance",
  },
  {
    icon: "/wow_icons/png/chat-white-bg.png",
    label: "Message",
    modal: "Message",
  },
];

export default function StaffCardDetails() {
  const [selectedStaffs, setSelectedStaffs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLeftCard, setShowLeftCard] = useState(false);
  const [isFloatingCardVisible, setFloatingCardVisible] = useState();
  const [isCreateMessageModalOpen, setCreateMessageModalOpen] = useState(false);

  // Function to handle "Select All" functionality
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStaffs(staffs.map((staff) => staff.id));
    } else {
      setSelectedStaffs([]);
    }
  };

  // Function to handle individual checkbox changes
  const handleCheckboxChange = (id) => {
    setSelectedStaffs((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((staffId) => staffId !== id)
        : [...prevSelected, id]
    );
  };

  const filteredstaffs = staffs.filter((staff) =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (selectedStaffs?.length >= 1) {
      setFloatingCardVisible(true);
    } else {
      setFloatingCardVisible(false);
    }
  }, [selectedStaffs]);
  const setShowRightActionCard = (action) => {
    switch (action.toLowerCase()) {
      case "attendance":
        setShowLeftCard(true);
        break;
      case "message":
        setCreateMessageModalOpen(true);
        break;
      default:
        "";
        break;
    }

    // setLeftRenderData(selectedAction); // return the data if needed
  };
  const renderLFloatingRightCard = () => (
    <div className="classroom-students-l-overflowborder text-center">
      {leftRenderData.map((data, i) => (
        <div
          key={i}
          className=" d-flex flex-column align-items-center pointer"
          // onClick={() => setShowAttendancediv(true)}
        >
          <img
            className="classroom-students-r-icon"
            src={data?.icon}
            alt={data?.label}
          />
          <div className="label-14-500 mt16 ">{data?.label}</div>
        </div>
      ))}
    </div>
  );
  const renderRFloatingRightCard = () => (
    <>
      {showLeftCard && renderLFloatingRightCard()}
      <div className="classroom-students-r-overflowborder">
        <div
          className="close-icon position-absolute "
          onClick={() => setFloatingCardVisible(false)}
        >
          &#x2715; {/* Unicode for cross icon (✕) */}
        </div>
        {rightRenderData.map((data, i) => (
          <div
            className=" d-flex flex-column align-items-center pointer"
            onClick={() => setShowRightActionCard(data?.label)}
          >
            <img
              className="classroom-students-r-icon"
              src={data?.icon}
              alt={data?.label}
            />
            <div className="label-14-400 text-white mt16">{data?.label}</div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="container my-3">
      {isFloatingCardVisible && renderRFloatingRightCard()}
      <div className="d-flex align-items-center my-3 justify-content-between">
        <div>
          <Input
            placeholder="Search staffs"
            prefix={<SearchOutlined />}
            style={{ width: 246, height: 40 }}
            className="light-font"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex  align-items-center">
        <div className="me-2">
          <Checkbox
            onChange={handleSelectAll}
            checked={selectedStaffs.length === staffs.length}
            style={{ marginBottom: 0 }} /* Remove margin to center-align */
          >
            Select All
          </Checkbox>
        </div>
        <div className="me-2">
          <Select
            className="select-staff light-font"
            defaultValue="select-designation"
          >
            <Option value="select-designation">Select Designation</Option>
            <Option value="admin">Admin</Option>
            <Option value="staff">Staff</Option>
            <Option value="lead-teacher">Lead Teacher</Option>
          </Select>
        </div>
        {selectedStaffs.length >= 1 && (
          <div>
            <Button
              variant="link"
              style={{ backgroundColor: "#b1afe919", border: "none" }}
              className="rounded custom-clear-button d-flex align-items-center gap-1"
              onClick={handleSelectAll}
            >
              <span className="clear-text">Clear</span>
              <img
                src="/classroom_icons/png/close.png"
                alt="Close icon"
                style={{ width: "8.3px", height: "8.3px" }}
              />
            </Button>
          </div>
        )}
      </div>

      <div className="row mt16">
        {filteredstaffs.map((staff) => (
          <div key={staff.id} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-2">
            <ActorBigCard
              actor={staff}
              selectedActors={selectedStaffs}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
        ))}
      </div>
      {isCreateMessageModalOpen && (
        <CommonModalComponent
          open={isCreateMessageModalOpen}
          setOpen={setCreateMessageModalOpen}
          modalWidthSize={549}
        >
          <CreateMessage setCancel={setCreateMessageModalOpen} />
        </CommonModalComponent>
      )}
    </div>
  );
}
