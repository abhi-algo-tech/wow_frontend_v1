import React, { useState } from "react";
import { Button, Checkbox, Input, Select } from "antd";

import { SearchOutlined } from "@ant-design/icons";
import ActorBigCard from "../../components/ActorBigCard";
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

export default function StaffCardDetails() {
  const [selectedStaffs, setSelectedStaffs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <div className="container my-3">
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
          </Select>
        </div>

        <div>
          <Button
            variant="link"
            style={{ backgroundColor: "#b1afe919", border: "none" }}
            className="rounded custom-clear-button d-flex align-items-center gap-1"
          >
            <span className="clear-text">Clear</span>
            <img
              src="/classroom_icons/png/close.png"
              alt="Close icon"
              style={{ width: "8.3px", height: "8.3px" }}
            />
          </Button>
        </div>
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
    </div>
  );
}
