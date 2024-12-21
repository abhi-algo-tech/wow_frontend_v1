import React, { useState } from "react";
import { Checkbox, Row, Col, Avatar, Input, Select } from "antd";
import styled from "styled-components";
import AssignConfirm from "./AssignConfirm";
import CommonModalComponent from "../../components/CommonModalComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { SearchOutlined } from "@ant-design/icons";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";

const ClassroomList = styled.div`
  max-height: 272px;
  overflow-y: auto;
  padding-right: 8px;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: #f5f5ff;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e7e7ff;
    border-radius: 3px;

    &:hover {
      background-color: #d1d1ff;
    }
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #e7e7ff #ffffff;
`;

const ClassroomItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5ff;
  }
`;

const StudentCard = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: ${(props) => (props.isSelected ? "none" : "1px solid #465cb3")};
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) =>
    props.isSelected ? "#F9F5FA" : "var(--White-colour, #fff)"};

  &:hover {
    border-color: ${(props) => (props.isSelected ? "none" : "#6366f1")};
    background-color: ${(props) => (props.isSelected ? "#F9F5FA" : "#f5f5ff")};
  }
`;
const classrooms = [
  { id: "1", name: "1-Yellow-C", color: "#FFD700" },
  { id: "2", name: "2-Orange-D", color: "#FFA500" },
  { id: "3", name: "3-Pink-C", color: "#FFC0CB" },
  { id: "4", name: "4-Purple-D", color: "#800080" },
  { id: "5", name: "1-Orange-D", color: "#FFA500" },
  { id: "6", name: "2-Yellow-C", color: "#FFD700" },
  { id: "7", name: "3-Orange-D", color: "#FFA500" },
  { id: "8", name: "8-Yellow-C", color: "#FFD700" },
  { id: "9", name: "9-Orange-D", color: "#FFA500" },
  { id: "10", name: "10-Pink-C", color: "#FFC0CB" },
  { id: "11", name: "11-Purple-D", color: "#800080" },
  { id: "12", name: "1-Orange-D", color: "#FFA500" },
  { id: "13", name: "2-Yellow-C", color: "#FFD700" },
  { id: "14", name: "3-Orange-D", color: "#FFA500" },
];

const students = [
  {
    id: "1",
    name: "Garry Nolan",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Greg matt",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Robin Tsonga",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "Erica Jones",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    name: "Amber Rose",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "6",
    name: "Jessica Lima",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "7",
    name: "Maria Dixon",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "8",
    name: "Nick Adams",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "9",
    name: "Lena Jung",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "Erica Jones",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    name: "Amber Rose",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "6",
    name: "Jessica Lima",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

export default function AssignStaff({ setCancel, classroomId }) {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState("1-Yellow-C");
  const { data: designationData } = useMasterLookupsByType("designation");

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(students.map((student) => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleStudentSelect = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };
  const handleSubmit = () => {
    console.log("Handle Submit triggered"); // Check if this log appears
    setAssignConfirm(true);
    setCancel(false);
  };
  // Filter the data based on the search query
  const handleSearchChange = (e) => {
    const query = e.target.value;
    // setSearchQuery(query);

    // Filter the data based on the query
    // const filtered = data.filter((student) =>
    //   student.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    // Update the filtered data
    // setFilteredData(filtered);
  };
  const designationOptions = {
    items: designationData?.data?.map((designation) => ({
      key: designation.id, // Convert id to string as keys are typically strings
      label: designation.name, // Use the name property for the label
    })),
  };
  const classroomList = [
    { id: 1, name: "1-Blue-D" },
    { id: 2, name: "2-Red-B" },
    { id: 3, name: "3-Green-C" },
  ];

  const tagList = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Staff" },
    { id: 3, name: "Pending" },
  ];

  return (
    <>
      <div className="card d-flex modal-card-padding">
        <span className="label-16-600">Assign to 1-Blue-D</span>
        <div className="label-14-600 ml10">Select Staff</div>
        <div className="d-flex align-items-center gap16">
          <Input
            placeholder="Search Student"
            prefix={<SearchOutlined />}
            style={{ width: 240, height: 40 }}
            onChange={handleSearchChange}
          />
          <Select
            className="select-student-add-from"
            placeholder="Select Classroom"
            style={{ width: 170 }}
          >
            {classroomList?.map((classroom) => (
              <Select.Option key={classroom.id} value={classroom.id}>
                {classroom.name}
              </Select.Option>
            ))}
          </Select>

          <Select
            className="select-student-add-from"
            placeholder="Select Designation"
            style={{ width: 170 }}
          >
            <Option value="all">All</Option>
            {designationOptions?.items?.map((designation) => (
              <Option key={designation.key} value={designation.key}>
                {designation.label}
              </Option>
            ))}
          </Select>
        </div>
        <div className="d-flex">
          {/* Main Content */}
          <div style={{ width: "100%" }}>
            <div
              style={{
                marginBottom: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Checkbox
                onChange={(e) => handleSelectAll(e.target.checked)}
                checked={selectedStudents.length === students.length}
                indeterminate={
                  selectedStudents.length > 0 &&
                  selectedStudents.length < students.length
                }
              >
                Select All
              </Checkbox>
              {/* <div className="assign-label">Assign Students to 1-Blue-D</div> */}
            </div>
            <ClassroomList>
              <Row gutter={[16, 8]}>
                {students.map((student) => {
                  const isSelected = selectedStudents.includes(student.id);
                  return (
                    <Col span={8} key={student.id}>
                      <StudentCard
                        isSelected={isSelected}
                        onClick={() => handleStudentSelect(student.id)}
                      >
                        <Avatar src={student.avatar} size={24} />
                        <span className="label-14-500">{student.name}</span>
                        <Checkbox
                          style={{ marginLeft: "auto" }}
                          checked={isSelected}
                        />
                      </StudentCard>
                    </Col>
                  );
                })}
              </Row>
            </ClassroomList>
          </div>
        </div>
        <div className="text-center">
          <ButtonComponent
            text="Cancel"
            padding="16px 62.6px"
            margin="0 16px 0 0"
            onClick={() => setCancel(false)}
            gradient={false}
          />
          <ButtonComponent
            text="Submit"
            buttonActionType="Submit"
            gradient={true}
            padding="16px 62.6px"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}
