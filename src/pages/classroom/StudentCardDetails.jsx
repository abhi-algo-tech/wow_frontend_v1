import React, { useState } from "react";
import { Button, Checkbox, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import StudentActivityDetails from "../student/StudentActivityDetails";
import ActorBigCard from "../../components/ActorBigCard";
const { Option } = Select;

// Sample student data
const students = [
  {
    id: 1,
    name: "Ajay",
    avatar: "/classroom_icons/png/Ajay.png",
    flags: ["Notes", "Allergies", "Dietary-Restrictions", "no-photo"],
    status: "",
  },
  {
    id: 2,
    name: "Lex",
    avatar: "/classroom_icons/png/Lex.png",
    flags: ["Notes", "Dietary-Restrictions", "Allergies"],
    status: "",
  },
  {
    id: 3,
    name: "Lisa",
    avatar: "/classroom_icons/png/Lisa.png",
    flags: ["Medication", "no-photo"],
    status: "",
  },
  {
    id: 4,
    name: "Keri",
    avatar: "/classroom_icons/png/Keri.png",
    flags: ["Notes", "Dietary-Restrictions", "no-photo"],
    status: "present",
  },
  {
    id: 5,
    name: "Erica",
    avatar: "/classroom_icons/png/Erica.png",
    flags: ["Notes", "Medication"],
    status: "present",
  },
  {
    id: 6,
    name: "Robert",
    avatar: "/classroom_icons/png/Robert.png",
    flags: ["Dietary-Restrictions", "Notes"],
    status: "present",
  },
  {
    id: 7,
    name: "Thomas",
    avatar: "/classroom_icons/png/Thomas.png",
    flags: ["Notes", "Dietary-Restrictions", "Allergies"],
    status: "present",
  },
  {
    id: 8,
    name: "Olivia",
    avatar: "/classroom_icons/png/Olivia.png",
    flags: ["Notes", "Dietary-Restrictions", "Allergies"],
    status: "present",
  },
  {
    id: 9,
    name: "Lara",
    avatar: "/classroom_icons/png/Lara.png",
    flags: ["no-photo", "Medication"],
    status: "present",
  },
  {
    id: 10,
    name: "Brux",
    avatar: "/classroom_icons/png/Brux.png",
    flags: ["Dietary-Restrictions", "Allergies", "Notes"],
    status: "absent",
  },
  {
    id: 11,
    name: "Emma",
    avatar: "/classroom_icons/png/Emma.png",
    flags: ["Notes", "Allergies", "Medication"],
    status: "absent",
  },
  {
    id: 12,
    name: "Arvind",
    avatar: "/classroom_icons/png/Ajay.png",
    flags: ["Allergies", "Notes", "Medication"],
    status: "absent",
  },
];

export default function StudentCardDetails() {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Function to handle "Select All" functionality
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all student IDs
      setSelectedStudents(students.map((student) => student.id));
    } else {
      // Deselect all
      setSelectedStudents([]);
    }
  };

  // Function to handle individual checkbox changes
  const handleCheckboxChange = (id) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id]
    );
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-3">
      <div className="d-flex align-items-center my-3 justify-content-between">
        <div>
          <Input
            placeholder="Search Students"
            prefix={<SearchOutlined />}
            style={{ width: 246, height: 40 }}
            className="light-font"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <StudentActivityDetails />
      </div>
      <div className="d-flex  align-items-center">
        <div className="me-2">
          <Checkbox
            onChange={handleSelectAll}
            checked={selectedStudents.length === students.length}
            style={{ marginBottom: 0 }} /* Remove margin to center-align */
          >
            Select All
          </Checkbox>
        </div>
        <div className="me-2">
          <Select
            style={{ width: 164, height: 33 }}
            className="select-student light-font"
            defaultValue="select-student"
          >
            <Option value="select-student">Select Tag</Option>
          </Select>
        </div>
        <div className="me-2">
          <Select
            style={{ width: 164, height: 33 }}
            className="select-student light-font"
            defaultValue="select-student"
          >
            <Option value="select-student">Select Status</Option>
          </Select>
        </div>
        {selectedStudents.length >= 1 && (
          <div>
            <Button
              variant="link"
              onClick={handleSelectAll}
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
        )}
      </div>

      <div className="row mt16">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="col-6 col-sm-4 col-md-3 col-lg-2 mb-2"
          >
            <ActorBigCard
              actor={student}
              selectedActors={selectedStudents}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
