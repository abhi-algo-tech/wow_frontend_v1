import React, { useEffect, useState } from "react";
import { Checkbox, Row, Col, Avatar, Input, Select } from "antd";
import styled from "styled-components";
import AssignConfirm from "./AssignConfirm";
import CommonModalComponent from "../../components/CommonModalComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { SearchOutlined } from "@ant-design/icons";
import { useSession } from "../../hooks/useSession";
import { useGetClassroomsBySchool } from "../../hooks/useClassroom";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";
import {
  useBatchUpdateStudent,
  useGetAllStudents,
  useStudentByClassroom,
} from "../../hooks/useStudent";
import { getInitialsTitleWithColor } from "../../services/common";

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

export default function AssignStudent({ setCancel, classroomData }) {
  const { academyId } = useSession();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const {
    data: classroomNames,
    isLoading,
    isError,
    error,
  } = useGetClassroomsBySchool(academyId);
  const { data: studentsList } = useGetAllStudents();
  const { data: statusData } = useMasterLookupsByType("status");
  const { data: tagsData } = useMasterLookupsByType("tags");
  const { data: assignedStudentData } = useStudentByClassroom(
    classroomData?.data?.id
  );

  const { mutate: batchUpdateStudents } = useBatchUpdateStudent();

  useEffect(() => {
    if (assignedStudentData && studentsList) {
      const findUnassignedStudents = (assignedStudentData, studentsList) => {
        const assignedIds = new Set(
          assignedStudentData.data.map((student) => student.id)
        );
        const unassigned = studentsList.data.filter(
          (student) => !assignedIds.has(student.id)
        );
        return unassigned;
      };

      const result = findUnassignedStudents(assignedStudentData, studentsList);
      setStudents(result);
    }
  }, [assignedStudentData, studentsList]); // Dependencies: triggers when these change

  const applyFilters = () => {
    if (!students) return; // Ensure students are available before applying filters

    let filtered = [...students];

    if (selectedClassroom !== "All") {
      filtered = filtered.filter(
        (student) => student?.classroomId === selectedClassroom
      );
    }

    if (selectedTag !== "All") {
      filtered = filtered.filter((student) =>
        student?.tags?.some((tag) => tag?.tagId === selectedTag)
      );
    }
    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (student) => student?.statusId === selectedStatus
      );
    }

    setFilteredStudents(filtered); // Update the filtered students list
  };

  useEffect(() => {
    applyFilters();
  }, [students, selectedClassroom, selectedTag, selectedStatus]);

  const classroomOptions = {
    items: [
      { key: "All", label: "All" },
      ...classroomNames?.data?.map((relation) => ({
        key: relation.id,
        label: relation.name,
      })),
    ],
  };
  const statusOptions = {
    items: [
      { key: "All", label: "All" },
      ...statusData?.data?.map((relation) => ({
        key: relation.id,
        label: relation.name,
      })),
    ],
  };
  const tagsOptions = {
    items: [
      { key: "All", label: "All" },
      ...tagsData?.data?.map((relation) => ({
        key: relation.id,
        label: relation.name,
      })),
    ],
  };

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
    // Prepare the data for batch update with selected students and classroomId
    const studentData = selectedStudents.map((studentId) => ({
      id: studentId, // Student ID
      classroomId: classroomData?.data?.id, // Selected classroom ID for each student
    }));

    // Call the batch update mutation with the prepared data
    batchUpdateStudents({ studentData });

    // Optionally close the modal after submission
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

  return (
    <>
      <div className="card d-flex modal-card-padding">
        <span className="label-16-600">
          Assign to {classroomData?.data?.name}
        </span>
        <div className="label-14-600 ml10">Select Students</div>
        <div className="d-flex align-items-center gap16">
          <Input
            placeholder="Search Student"
            prefix={<SearchOutlined />}
            style={{ width: 240, height: 40 }}
            onChange={(e) => {
              setFilteredStudents(
                students.filter((data) =>
                  `${data.firstName} ${data.lastName}`
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              ),
                setSelectedStudents([]);
            }}
          />

          <Select
            className="select-student-add-from"
            placeholder="Select Classroom"
            style={{ width: 150 }}
            onChange={(value) => {
              setSelectedClassroom(value), setSelectedStudents([]);
            }}
          >
            {classroomOptions?.items?.map((option) => (
              <Option key={option.key} value={option.key}>
                {option.label}
              </Option>
            ))}
          </Select>

          <Select
            className="select-student-add-from"
            placeholder="Select Tag"
            style={{ width: 150 }}
            onChange={(value) => {
              setSelectedTag(value), setSelectedStudents([]);
            }}
          >
            {tagsOptions?.items?.map((option) => (
              <Option key={option.key} value={option.key}>
                {option.label}
              </Option>
            ))}
          </Select>

          <Select
            className="select-student-add-from"
            placeholder="Select Status"
            style={{ width: 150 }}
            onChange={(value) => {
              setSelectedStatus(value), setSelectedStudents([]);
            }}
          >
            {statusOptions?.items?.map((option) => (
              <Option key={option.key} value={option.key}>
                {option.label}
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
                checked={
                  filteredStudents.length > 0 &&
                  selectedStudents.length === filteredStudents.length
                }
                indeterminate={
                  filteredStudents.length > 0 &&
                  selectedStudents.length > 0 &&
                  selectedStudents.length < filteredStudents.length
                }
                disabled={
                  filteredStudents.length === 0 ||
                  filteredStudents.length === null
                }
              >
                Select All
              </Checkbox>

              {/* <div className="assign-label">Assign Students to 1-Blue-D</div> */}
            </div>
            <ClassroomList>
              <Row gutter={[16, 8]}>
                {filteredStudents?.map((student) => {
                  const isSelected = selectedStudents.includes(student.id);
                  return (
                    <Col span={8} key={student.id}>
                      <StudentCard
                        isSelected={isSelected}
                        onClick={() => handleStudentSelect(student.id)}
                      >
                        {/* <Avatar src={student.profileUrl} size={24} /> */}
                        <Avatar
                          size={24}
                          src={student?.profileUrl || undefined}
                          // className="mb8"
                          style={{
                            backgroundColor: student?.profileUrl
                              ? undefined
                              : getInitialsTitleWithColor(
                                  `${student?.firstName} ${student?.lastName}`
                                ).backgroundColor,
                            color: "#fff",
                          }}
                        >
                          {!student?.photoUrl &&
                            getInitialsTitleWithColor(
                              `${student?.firstName} ${student?.lastName}`
                            ).initials}
                        </Avatar>
                        <span className="label-14-500">
                          {student?.firstName} {student?.lastName}
                        </span>
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
