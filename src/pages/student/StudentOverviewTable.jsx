import React, { useEffect, useState } from "react";
import {
  Input,
  Switch,
  Checkbox,
  Tag,
  Avatar,
  Tooltip,
  Card,
  Form,
  Dropdown,
  Space,
  message,
  Typography,
  Popover,
} from "antd";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../components/TableComponent";
import { getInitialsTitle } from "../../services/common";
import { IoIosMore } from "react-icons/io";
import CommonModalComponent from "../../components/CommonModalComponent";
import ApplyFilter from "./ApplyFilter";
import DeletePopUp from "../../components/DeletePopUp";
import { Link } from "react-router-dom";
import { useGetAllStudents, useUpdateStudent } from "../../hooks/useStudent";
import { generateStudentData } from "./StudentCommon";
import CreateStudent from "./CreateStudent";
const { Text } = Typography;
const StudentOverviewTable = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isStudentTableFilterModalOpen, setStudentTableFilterModalOpen] =
    useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const { data: students, isLoading, isError, error } = useGetAllStudents();
  const updateStudentMutation = useUpdateStudent();

  // console.log("filteredData", filteredData);

  useEffect(() => {
    if (students) {
      const formattedStudentData = generateStudentData(students.data);
      setData(formattedStudentData);
      setFilteredData(formattedStudentData);
    }

    if (isError) {
      message.error("Failed to load student details. Please try again later.");
      console.error("Error fetching student details:", error);
    }
  }, [students, isError, error]);

  // Handle filter application
  const handleApplyFilters = (filters) => {
    setSelectedFilters(filters);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setSelectedFilters({});
  };

  // Clear a specific filter
  const handleClearSingleFilter = (key) => {
    const updatedFilters = { ...selectedFilters };
    delete updatedFilters[key];
    setSelectedFilters(updatedFilters);
  };

  // Handle action click (Edit, Assign, Manage)
  const onActionClick = (action, record) => {
    if (action === "edit") {
      // setCurrentClassroomId(record.key); // Set the selected classroom's ID
      // setCreateClassroomModalOpen(true); // Open the modal
    } else if (action === "delete") {
      // const formData = new FormData();
      // formData.append("isDeleted", true);
      // const classroomId = record.key;
      // updateClassroom({ classroomId, classroomData: formData });
    } else {
      console.log(action, record);
    }
  };
  const handleDeleteModal = (id, name) => {
    setSelectedRecord({ id, name }); // Store the clicked item's id and name
    setDeleteModalOpen(true); // Open the delete modal
  };
  const handleEditModal = (id) => {
    setSelectedStudentId(id); // Store the clicked item's id and name
    setEditModalOpen(true); // Open the delete modal
  };

  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append("isDeleted", true);

    try {
      await updateStudentMutation.mutateAsync({
        studentId: id,
        studentData: formData,
      });
      message.success("Student deleted successfully!");
      setDeleteModalOpen(false); // Close the modal after deletion
    } catch (error) {
      message.error(`Failed to delete student: ${error.message}`);
      setDeleteModalOpen(false);
    }
  };

  const columns = [
    {
      title: (
        <span className="student-table-header-label">
          <Checkbox className="mr10" />
          Student Name
        </span>
      ),
      dataIndex: "name",
      key: "name",
      width: 240,
      className: "student-table-body-label", // Custom class
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Checkbox />
          <div className="position-relative d-inline-block ">
            <Avatar src={record.avatar} size={24} />
            <div
              className={`position-absolute top-0 end-0 translate-middle rounded-circle ${
                record.status === "present" ? "active-green" : ""
              }`}
              style={
                record.status === "present"
                  ? {
                      width: "5px",
                      height: "3px",
                      margin: "5px -8px",
                      padding: "3px",
                      border: "solid 3px #fff",
                    }
                  : {}
              }
            />
          </div>
          <Link
            to={`/student-profile/${record.key}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center", // Ensures content inside link is centered vertically
              width: "100%",
              textDecoration: "none", // Optional to remove underline
            }}
          >
            <span>{record.name}</span>
            {record.upcoming && (
              <Tag
                style={{
                  backgroundColor: "#FEEBC8",
                  color: "#C05621",
                  border: "none",
                }}
              >
                Upcoming
              </Tag>
            )}
          </Link>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name), // Sorting by name alphabetically
    },
    {
      title: <span className="student-table-header-label">Classroom</span>,
      dataIndex: "classroom",
      key: "classroom",
      className: "student-table-body-label", // Custom class
      render: (classroom) => (
        <>
          <div className="d-flex">
            <div className="position-relative">
              <Avatar
                size={24}
                style={{
                  backgroundColor: "#1890ff", // Set background color for initials
                  color: "#fff", // Set text color for initials
                  fontSize: "20px", // Adjust font size if needed
                }}
                className="mr9"
              >
                {getInitialsTitle(classroom.name)}
              </Avatar>
            </div>
            <Text className="classroom-inactive-label">{classroom.name}</Text>
            {/* <Tag
              style={{
                backgroundColor: `${getColor(classroom.color, "light")}`,
                color: `${getColor(classroom.color, "dark")}`,
                border: "none",
              }}
            >
              {classroom.name}
            </Tag> */}
          </div>
        </>
      ),
      sorter: (a, b) => a.classroom.name.localeCompare(b.classroom.name), // Sorting by classroom name
    },
    {
      title: <span className="student-table-header-label">Tags</span>,
      dataIndex: "tags",
      key: "tags",
      className: "student-table-body-label",
      width: 195,
      render: (tags, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0px",
            position: "relative",
          }}
          onMouseEnter={() => setHoveredRow(record.key)}
          onMouseLeave={() => setHoveredRow(null)}
        >
          <Tag
            style={{
              backgroundColor: "#B1AFE94D",
              color: "#1B237E",
              border: "none",
            }}
          >
            {tags.days} Days
          </Tag>
          <Tag
            style={{
              backgroundColor: "#CBF6FF66",
              color: "#1B237E",
              border: "none",
            }}
          >
            {tags.type}
          </Tag>
          {tags.additional && (
            <Popover
              content={
                <div
                  style={{
                    backgroundColor: "#f6ffed",
                    border: "1px solid #b7eb8f",
                    borderRadius: "6px",
                    padding: "8px 0",
                  }}
                >
                  {tags.additionalItems?.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "8px 16px",
                        color: "#666",
                        fontSize: "14px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#d9f7be";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              }
              trigger="click"
              placement="top"
              overlayInnerStyle={{
                padding: 0,
                backgroundColor: "transparent",
              }}
            >
              <Tag
                style={{
                  backgroundColor: "#D9FFCB66",
                  color: "#1B237E",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                +{tags.additional}
              </Tag>
            </Popover>
          )}
          {hoveredRow === record.key && (
            <Tooltip title="Edit Tags" style={{ backgroundColor: "#41414ECC" }}>
              <Avatar
                size={20}
                src={"/classroom_icons/png/edit-tag.png"}
                style={{
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: <span className="student-table-header-label">Schedule</span>,
      dataIndex: "schedule",
      key: "schedule",
      className: "student-table-body-label", // Custom class
      render: (schedule) => (
        <div style={{ display: "flex", alignItems: "center", gap: "0px" }}>
          {schedule.days.map((day) => (
            <Tag
              key={day}
              style={{
                minWidth: "36px",
                textAlign: "center",
                backgroundColor: schedule.active.includes(day)
                  ? "#B1AFE94D"
                  : "#F7FAFC",
                color: schedule.active.includes(day) ? "#1B237E" : "#57335380",
                border: "none",
              }}
            >
              {day}
            </Tag>
          ))}
        </div>
      ),
      sorter: (a, b) => a.schedule.days.length - b.schedule.days.length, // Sorting by number of schedule days
    },
    {
      title: <span className="student-table-header-label">Birthdate</span>,
      dataIndex: "birthdate",
      key: "birthdate",
      className: "student-table-body-label", // Custom class
      sorter: (a, b) => new Date(a.birthdate) - new Date(b.birthdate), // Sorting by birthdate
    },
    {
      title: <span className="student-table-header-label">Movement Date</span>,
      dataIndex: "movementDate",
      key: "movementDate",
      className: "student-table-body-label", // Custom class
      sorter: (a, b) => new Date(a.movementDate) - new Date(b.movementDate), // Sorting by movement date
    },
    {
      title: <span className="student-table-header-label">Action</span>,
      key: "action",
      className: "student-table-body-label", // Custom class
      align: "center",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                onClick: () => handleEditModal(record.key),
                label: "Edit",
                className: "student-table-action-label",
              },
              {
                key: "delete",
                onClick: () => handleDeleteModal(record.key, record.name),
                label: "Delete",
                className: "student-table-action-label",
              },
            ],
            onClick: ({ key }) => {
              if (key !== "delete") {
                onActionClick(key, record); // call directly for non-delete actions
              }
            },
          }}
          trigger={["click"]}
        >
          <IoIosMore className="pointer" />
        </Dropdown>
      ),
    },
  ];

  const getColor = (color, shade) => {
    const colors = {
      blue: { light: "#E6F6FF", dark: "#0086C9" },
      yellow: { light: "#FFFBEB", dark: "#B7791F" },
      orange: { light: "#FEEBCB", dark: "#C05621" },
      pink: { light: "#FFF5F7", dark: "#B83280" },
      purple: { light: "#FAF5FF", dark: "#6B46C1" },
    };

    // Return color if exists, otherwise fallback to light gray
    if (colors[color]) {
      return colors[color][shade] || colors[color].light;
    }
    return "#D3D3D3"; // Default fallback color
  };

  return (
    <>
      <div className="mt20">
        <Card styles={{ body: { padding: 16 } }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Input
                placeholder="Search by Students/Parent"
                prefix={<SearchOutlined style={{ color: "#a0aec0" }} />}
                style={{ minWidth: "240px", height: 40 }}
              />
              <Space>
                <Avatar
                  onClick={() => setStudentTableFilterModalOpen(true)}
                  src={"/wow_icons/png/mdi_filter.png"}
                  className="pointer"
                />
                {/* Display selected filters */}
                {Object.entries(selectedFilters).map(([key, value]) => (
                  <Tag
                    key={key}
                    color="blue"
                    closable
                    onClose={() => handleClearSingleFilter(key)}
                  >
                    {`${key}: ${value}`}
                  </Tag>
                ))}
                {Object.keys(selectedFilters).length > 0 && (
                  <Tag color="blue" onClick={handleClearAllFilters}>
                    Clear All
                  </Tag>
                )}
              </Space>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Form.Item
                name="active"
                valuePropName="checked"
                className="mb-0 me-2 classroom-show-inactive-toggle-btn"
              >
                <Switch />
              </Form.Item>
              <span className="classroom-inactive-label">Show Inactive</span>
              {/* <span style={{ fontSize: "14px", color: "#718096" }}>
              Show Inactive
            </span>
            <Switch size="small" /> */}
            </div>
          </div>

          <TableComponent
            columns={columns}
            dataSource={filteredData}
            tableSize={"small"}
            loading={isLoading}
            rowKey="key"
            sizeChanger={false}
          />
        </Card>
      </div>
      {isStudentTableFilterModalOpen && (
        <CommonModalComponent
          open={isStudentTableFilterModalOpen}
          setOpen={setStudentTableFilterModalOpen}
          modalWidthSize={600}
          modalHeightSize={253}
          isClosable={true}
        >
          <ApplyFilter
            CardTitle={"Filter"}
            classroomId={null}
            closeModal={() => setStudentTableFilterModalOpen(false)}
            onApplyFilter={handleApplyFilters}
          />
        </CommonModalComponent>
      )}
      {isDeleteModalOpen && (
        <CommonModalComponent
          open={isDeleteModalOpen}
          setOpen={setDeleteModalOpen}
          modalWidthSize={493}
          modalHeightSize={232}
          isClosable={true}
        >
          <DeletePopUp
            setCancel={setDeleteModalOpen}
            deleteData={selectedRecord}
            CardTitle="Delete Student"
            handleDelete={handleDelete} // Pass the updated handleDelete function
          />
        </CommonModalComponent>
      )}
      {isEditModalOpen && (
        <CommonModalComponent
          open={isEditModalOpen}
          setOpen={setEditModalOpen}
          modalWidthSize={493}
          modalHeightSize={232}
          isClosable={true}
        >
          <CreateStudent
            CardTitle={"Edit Student"}
            studentId={selectedStudentId}
            closeModal={() => setEditModalOpen(false)}
          />
        </CommonModalComponent>
      )}
    </>
  );
};

export default StudentOverviewTable;
