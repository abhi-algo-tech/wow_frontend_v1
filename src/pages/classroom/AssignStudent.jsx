import React, { useState } from "react";
import { Checkbox, Row, Col, Avatar } from "antd";
import styled from "styled-components";
import AssignConfirm from "./AssignConfirm";
import CommonModalComponent from "../../components/CommonModalComponent";
import ButtonComponent from "../../components/ButtonComponent";

const ClassroomList = styled.div`
  max-height: 400px;
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
  scrollbar-color: #e7e7ff #f5f5ff;
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
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #6366f1;
    background-color: #f5f5ff;
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

export default function AssignStudent({ setCancel, setAssignConfirm }) {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState("1-Yellow-C");

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

  return (
    <>
      <div className="card modal-card-padding">
        <span className="modal-card-label-name">Choose Classroom</span>
        <div style={{ display: "flex", gap: "24px" }}>
          {/* Left Sidebar */}
          <div style={{ width: "200px" }}>
            <ClassroomList>
              {classrooms.map((classroom) => (
                <ClassroomItem
                  key={classroom.id}
                  onClick={() => setSelectedClassroom(classroom.name)}
                  style={{
                    backgroundColor:
                      selectedClassroom === classroom.name
                        ? "#F5F5FF"
                        : "transparent",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: classroom.color,
                      marginRight: "12px",
                    }}
                  />
                  <span style={{ fontSize: "14px" }}>{classroom.name}</span>
                </ClassroomItem>
              ))}
            </ClassroomList>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                marginBottom: "16px",
                display: "flex",
                justifyContent: "space-between",
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
              <div>Assign Students to 1-Blue-D</div>
            </div>

            <Row gutter={[16, 16]}>
              {students.map((student) => (
                <Col span={8} key={student.id}>
                  <StudentCard onClick={() => handleStudentSelect(student.id)}>
                    <Avatar src={student.avatar} />
                    <span>{student.name}</span>
                    <Checkbox
                      style={{ marginLeft: "auto" }}
                      checked={selectedStudents.includes(student.id)}
                    />
                  </StudentCard>
                </Col>
              ))}
            </Row>

            <div className="center-bottom-buttons ">
              <ButtonComponent
                text="Cancel"
                padding={"16px 62.6px"}
                margin="0 16px 0 0"
                onClick={() => setCancel(false)}
                gradient={false}
              />

              <ButtonComponent
                text="Submit"
                buttonActionType="Submit"
                gradient={true}
                padding={"16px 62.6px"}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
