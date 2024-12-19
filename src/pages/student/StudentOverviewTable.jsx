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
  Typography,
  Popover,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
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
import { CustomMessage } from "../../utils/CustomMessage";
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
  // const [showInactive, setShowInactive] = useState(false);
  const [showActive, setShowActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: students, isLoading, isError, error } = useGetAllStudents();
  const updateStudentMutation = useUpdateStudent();

  useEffect(() => {
    if (students) {
      const formattedStudentData = generateStudentData(students.data);
      setData(formattedStudentData);
      setFilteredData(formattedStudentData);
    }

    if (isError) {
      CustomMessage.error(
        "Failed to load student details. Please try again later."
      );
    }
  }, [students, isError, error]);

  // Function to get active data
  const getActiveData = (data) => {
    return (
      data?.filter(
        (student) =>
          student.status?.toLowerCase() === "active" ||
          student.status?.toLowerCase() === "upcoming"
      ) || []
    );
  };

  // Function to get inactive data
  const getInactiveData = (data) => {
    return (
      data?.filter((student) => student.status?.toLowerCase() === "inactive") ||
      []
    );
  };

  // Update filtered data based on showActive
  useEffect(() => {
    const filteredStudents = showActive
      ? getActiveData(data)
      : getInactiveData(data);

    setFilteredData(filteredStudents || []);
  }, [showActive, data]);

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
      CustomMessage.success("Student deleted successfully!");
      setDeleteModalOpen(false); // Close the modal after deletion
    } catch (error) {
      CustomMessage.error(`Failed to delete student: ${error.message}`);
      setDeleteModalOpen(false);
    }
  };

  // Filter the data based on the search query
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the data based on the query
    const filtered = data.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update the filtered data
    setFilteredData(filtered);
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
      align: "start",
      width: 240,
      className: "student-table-body-label",
      responsive: ["xs", "sm", "md", "lg"],
      render: (_, record) => (
        <div className="d-flex align-items-center gap-2">
          <Checkbox />
          <div className="position-relative d-inline-block">
            <Avatar
              src={record.avatar}
              size={window.innerWidth < 768 ? 20 : 24} // Smaller size for small screens
            />
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
            to="/student-profile"
            state={{
              studentId: record.key,
              name: record.name,
            }}
            className="d-flex justify-content-between align-items-center w-100 text-truncate"
          >
            <span className="label-14-500">{record.name}</span>
            {record.upcoming === "Upcoming" && (
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
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: <span className="student-table-header-label">Classroom</span>,
      dataIndex: "classroom",
      key: "classroom",
      className: "student-table-body-label",
      responsive: ["sm", "md", "lg"],
      render: (classroom) => (
        <div className="d-flex align-items-center">
          <Avatar
            size={window.innerWidth < 768 ? 20 : 24}
            style={{
              backgroundColor: "#1890ff",
              color: "#fff",
            }}
            className="mr9"
          >
            {getInitialsTitle(classroom.name)}
          </Avatar>
          <span className="classroom-inactive-label text-truncate">
            {classroom.name}
          </span>
        </div>
      ),
      sorter: (a, b) => a.classroom.name.localeCompare(b.classroom.name),
    },
    {
      title: <span className="student-table-header-label">Tags</span>,
      dataIndex: "tags",
      key: "tags",
      className: "student-table-body-label",
      width: 195,
      responsive: ["md", "lg"],
      render: (tags, record) => {
        const visibleTags = tags.slice(0, 2); // Show first 2 tags
        const remainingTags = tags.slice(2); // Remaining tags

        const content = (
          <div>
            {remainingTags.map((tag, index) => (
              <div key={index} className="label-12-400">
                {tag.tagName}
              </div>
            ))}
          </div>
        );

        return (
          <div
            onMouseEnter={() => setHoveredRow(record.key)} // Track hovered row globally
            onMouseLeave={() => setHoveredRow(null)} // Reset hover state
            className="d-flex align-items-center gap-1 flex-wrap"
          >
            {/* Render visible tags */}
            {visibleTags.map((tag, index) => (
              <Tag
                key={index}
                style={{
                  backgroundColor: tag.backgroundColor || "#B1AFE94D",
                  color: "#1B237E",
                  border: "none",
                }}
              >
                {tag.tagName}
              </Tag>
            ))}

            {/* Popover for remaining tags */}
            {remainingTags.length > 0 && (
              <Popover color="#F0FFEA" content={content}>
                <Tag
                  style={{
                    backgroundColor: "#D9FFCB66",
                    color: "#1B237E",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  +{remainingTags.length}
                </Tag>
              </Popover>
            )}

            {/* Render edit icon for all rows if hoveredRow matches */}
            {hoveredRow === record.key && (
              <Tooltip
                title="Edit Tags"
                style={{ backgroundColor: "#41414ECC" }}
              >
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
        );
      },
    },
    {
      title: <span className="student-table-header-label">Schedule</span>,
      dataIndex: "schedule",
      key: "schedule",
      width: 250,
      responsive: ["lg"],
      render: (schedule) => (
        <div className="d-flex align-items-center gap-1 flex-wrap">
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
      // sorter: (a, b) => a.schedule.days.length - b.schedule.days.length,
    },
    {
      title: <span className="student-table-header-label">Birthdate</span>,
      dataIndex: "birthdate",
      key: "birthdate",
      responsive: ["xs", "md", "lg"],
      sorter: (a, b) => new Date(a.birthdate) - new Date(b.birthdate),
    },
    {
      title: <span className="student-table-header-label">Action</span>,
      key: "action",
      className: "student-table-body-label",
      align: "center",
      responsive: ["xs", "md", "lg"],
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                onClick: () => handleEditModal(record.key),
                label: "Edit",
              },
              {
                key: "delete",
                onClick: () => handleDeleteModal(record.key, record.name),
                label: "Delete",
              },
            ],
          }}
        >
          <IoIosMore className="pointer" />
        </Dropdown>
      ),
    },
  ];

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
                onChange={handleSearchChange}
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
                <Switch
                  checked={!showActive}
                  onChange={(checked) => setShowActive(!checked)}
                />
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
            moduleName="Students"
            rowKey="key"
            sizeChanger={false}
            showTotalProp={true}
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
          isClosable={false}
        >
          <DeletePopUp
            setCancel={setDeleteModalOpen}
            deleteData={selectedRecord}
            // CardTitle="Delete Student"
            handleDelete={handleDelete} // Pass the updated handleDelete function
            module="Student"
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
