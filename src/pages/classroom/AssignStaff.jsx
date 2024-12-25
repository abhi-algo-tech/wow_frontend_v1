import React, { useState, useEffect } from "react";
import { Checkbox, Row, Col, Avatar, Input, Select } from "antd";
import styled from "styled-components";
import AssignConfirm from "./AssignConfirm";
import CommonModalComponent from "../../components/CommonModalComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { SearchOutlined } from "@ant-design/icons";
import { useMasterLookupsByType } from "../../hooks/useMasterLookup";
import { useGetClassroomsBySchool } from "../../hooks/useClassroom";
import { useSession } from "../../hooks/useSession";
import {
  useBatchUpdateStaff,
  useGetAllStaff,
  useStaffByClassroom,
} from "../../hooks/useStaff";
import { getInitialsTitleWithColor } from "../../services/common";

const { Option } = Select;

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

export default function AssignStaff({ setCancel, classroomData }) {
  const { academyId } = useSession();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [filteredStaffs, setFilteredStaffs] = useState([]);
  const { data: designationData } = useMasterLookupsByType("designation");
  const { data: staffList } = useGetAllStaff();
  const { data: assignedStaffData } = useStaffByClassroom(
    classroomData?.data?.id
  );
  const [selectedClassroom, setSelectedClassroom] = useState("All");
  const [selectedDesignation, setSelectedDesignation] = useState("All");

  const {
    data: classroomNames,
    isLoading,
    isError,
    error,
  } = useGetClassroomsBySchool(academyId);

  const { mutate: batchUpdateStaff } = useBatchUpdateStaff();

  useEffect(() => {
    if (assignedStaffData && staffList) {
      const findUnassignedStudents = (assignedStaffData, staffList) => {
        const assignedIds = new Set(
          assignedStaffData.data.map((staff) => staff.id)
        );
        const unassigned = staffList.data.filter(
          (staff) => !assignedIds.has(staff.id)
        );
        return unassigned;
      };

      const result = findUnassignedStudents(assignedStaffData, staffList);
      setStaff(result);
    }
  }, [staffList, assignedStaffData]); // Dependencies: triggers when these change

  const applyFilters = () => {
    if (!staff) return; // Ensure staff are available before applying filters

    let filtered = [...staff];

    if (selectedClassroom !== "All") {
      filtered = filtered.filter((staff) =>
        staff?.classrooms?.some(
          (classroom) => classroom?.id === selectedClassroom
        )
      );
    }

    if (selectedDesignation !== "All") {
      filtered = filtered.filter(
        (staff) => staff?.designationId === selectedDesignation
      );
    }

    setFilteredStaffs(filtered); // Update the filtered staff list
  };

  useEffect(() => {
    applyFilters();
  }, [staff, selectedClassroom, selectedDesignation]);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(staff.map((item) => item.id));
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
    // Prepare the payload
    const payload = {
      staffIds: selectedStudents,
      classroomId: classroomData?.data?.id,
    };

    // Call the mutation
    batchUpdateStaff(payload);

    // Optionally close the modal after submission
    setCancel(false);
  };

  const classroomOptions = {
    items: [
      { key: "All", label: "All" },
      ...classroomNames?.data?.map((relation) => ({
        key: relation.id,
        label: relation.name,
      })),
    ],
  };

  const designationOptions = {
    items: [
      { key: "All", label: "All" },
      ...designationData?.data?.map((designation) => ({
        key: designation.id, // Convert id to string as keys are typically strings
        label: designation.name, // Use the name property for the label
      })),
    ],
  };

  return (
    <>
      <div className="card d-flex modal-card-padding">
        <span className="label-16-600">
          Assign to {classroomData?.data?.name}
        </span>
        <div className="label-14-600 ml10">Select Staff</div>
        <div className="d-flex align-items-center gap16">
          <Input
            placeholder="Search Staff"
            prefix={<SearchOutlined />}
            style={{ width: 240, height: 40 }}
            onChange={(e) =>
              setFilteredStaffs(
                staff.filter((staffMember) =>
                  `${staffMember.firstName} ${staffMember.lastName}`
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              )
            }
          />

          <Select
            className="select-student-add-from"
            placeholder="Select Classroom"
            style={{ width: 170 }}
            onChange={(value) => setSelectedClassroom(value)}
          >
            {classroomOptions?.items?.map((option) => (
              <Option key={option.key} value={option.key}>
                {option.label}
              </Option>
            ))}
          </Select>

          <Select
            className="select-student-add-from"
            placeholder="Select Designation"
            style={{ width: 170 }}
            onChange={(value) => setSelectedDesignation(value)}
          >
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
              {/* <Checkbox
                onChange={(e) => handleSelectAll(e.target.checked)}
                checked={selectedStudents.length === filteredStaffs.length}
                indeterminate={
                  selectedStudents.length > 0 &&
                  selectedStudents.length < filteredStaffs.length
                }
              >
                Select All
              </Checkbox> */}
              <Checkbox
                onChange={(e) => handleSelectAll(e.target.checked)}
                checked={
                  filteredStaffs.length > 0 &&
                  selectedStudents.length === filteredStaffs.length
                }
                indeterminate={
                  filteredStaffs.length > 0 &&
                  selectedStudents.length > 0 &&
                  selectedStudents.length < filteredStaffs.length
                }
                disabled={
                  filteredStaffs.length === 0 || filteredStaffs.length === null
                }
              >
                Select All
              </Checkbox>
            </div>
            <ClassroomList>
              <Row gutter={[16, 8]}>
                {filteredStaffs.map((staff) => {
                  const isSelected = selectedStudents.includes(staff.id);
                  return (
                    <Col span={8} key={staff.id}>
                      <StudentCard
                        isSelected={isSelected}
                        onClick={() => handleStudentSelect(staff.id)}
                      >
                        {/* <Avatar src={staff.avatar} size={24} /> */}
                        <Avatar
                          size={24}
                          src={staff?.profileUrl || undefined}
                          // className="mb8"
                          style={{
                            backgroundColor: staff?.profileUrl
                              ? undefined
                              : getInitialsTitleWithColor(
                                  `${staff?.firstName} ${staff?.lastName}`
                                ).backgroundColor,
                            color: "#fff",
                          }}
                        >
                          {!staff?.photoUrl &&
                            getInitialsTitleWithColor(
                              `${staff?.firstName} ${staff?.lastName}`
                            ).initials}
                        </Avatar>
                        <span className="label-14-500">
                          {staff?.firstName} {staff?.lastName}
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
