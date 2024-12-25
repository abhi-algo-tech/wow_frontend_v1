import React, { useEffect, useMemo, useState } from "react";
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
import dayjs from "dayjs";
import {
  leftRenderAttendanceData,
  leftRenderDefaultData,
  rightRenderData,
} from "../classroom/StudentCardDetails";
import ActivityIconSubMenu from "../classroom/ActivityIconSubMenu";
import CreateMessage from "../../components/message/CreateMessage";
const { Text } = Typography;

const StudentOverviewTable = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isStudentTableFilterModalOpen, setStudentTableFilterModalOpen] =
    useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isActivityIconSubMenuModalOpen, setActivityIconSubMenuModalOpen] =
    useState(false);
  const [isCreateMessageModalOpen, setCreateMessageModalOpen] = useState(false);
  const [isAssignConfirmModalOpen, setAssignConfirmModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    classroom: null,
    status: null,
    tag: null,
  });

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // const [showInactive, setShowInactive] = useState(false);

  const [showActive, setShowActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLeftRenderUi, setLeftRenderUi] = useState("");
  const [isSignOutModalOpen, setSignOutModalOpen] = useState(false);
  const [leftRenderData, setLeftRenderData] = useState([]);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const { data: students, isLoading, isError, error } = useGetAllStudents();
  const updateStudentMutation = useUpdateStudent();

  useEffect(() => {
    if (students) {
      const formattedStudentData = generateStudentData(students.data);
      // console.log("formattedStudentData:", formattedStudentData);
      setData(formattedStudentData);
      setFilteredData(formattedStudentData);
    }

    if (isError) {
      CustomMessage.error(
        "Failed to load student details. Please try again later."
      );
    }
  }, [students, isError, error]);

  // Helper functions for filtering data
  const getFilteredDataByStatus = (data, status) =>
    data?.filter((student) => student.status?.toLowerCase() === status) || [];

  const getFilteredData = (data, showActive) =>
    showActive
      ? getFilteredDataByStatus(data, "active").concat(
          getFilteredDataByStatus(data, "upcoming")
        )
      : getFilteredDataByStatus(data, "inactive");

  // Memoized filtered data based on showActive
  const baseFilteredStudents = useMemo(
    () => getFilteredData(data || [], showActive),
    [showActive, data]
  );

  // Combine search and funnel filtering
  const finalFilteredData = useMemo(() => {
    // Filter by search query
    const searchFiltered = searchQuery
      ? baseFilteredStudents.filter((student) =>
          student.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : baseFilteredStudents;

    // Apply funnel filters if present
    if (Object.keys(selectedFilters).length === 0) {
      return searchFiltered;
    }

    if (
      (showActive && selectedFilters?.status?.toLowerCase() === "inactive") ||
      (!showActive &&
        ["active", "upcoming"].includes(selectedFilters?.status?.toLowerCase()))
    ) {
      return [];
    }

    return searchFiltered.filter((student) => {
      const hasClassroomMatch = selectedFilters?.classroom
        ? student.classroom?.name === selectedFilters.classroom
        : true;

      const hasStatusMatch = selectedFilters?.status
        ? student.status?.toLowerCase() ===
          selectedFilters.status?.toLowerCase()
        : true;

      const hasTagMatch = selectedFilters?.tag
        ? student.tags?.some((tag) => tag.tagName === selectedFilters.tag)
        : true;

      return hasClassroomMatch && hasStatusMatch && hasTagMatch;
    });
  }, [baseFilteredStudents, searchQuery, selectedFilters, showActive]);

  // Update the filtered data state whenever the final filtered data changes
  useEffect(() => {
    setFilteredData(finalFilteredData);
    // Extract classroom name and key and push into state
    const classroomData = data.map((item) => ({
      name: item.classroom.name,
      id: item.key,
    }));

    // Set the state with the classroom data
    setClassrooms(classroomData);
  }, [finalFilteredData]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
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

  const handleApplyFilters = (filter) => {
    setSelectedFilters(filter);
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
  // const handleSearchChange = (e) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);

  //   // Filter the data based on the query
  //   const filtered = data.filter((student) =>
  //     student.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  //   // Update the filtered data
  //   setFilteredData(filtered);
  // };

  const columns = [
    {
      title: <span className="student-table-header-label">Student Name</span>,
      dataIndex: "name",
      key: "name",
      align: "start",
      width: 180,
      className: "student-table-body-label",
      responsive: ["xs", "sm", "md", "lg"],
      render: (_, record) => (
        <div className="d-flex align-items-center gap-2">
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
            onClick={(e) => e.stopPropagation()} // Prevent row selection
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
      width: 145,
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
          <span className="classroom-inactive-label">
            {classroom.name.length > 10
              ? classroom.name.slice(0, 10) + "..."
              : classroom.name}
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
      width: 240,
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
      width: 100,
      responsive: ["xs", "md", "lg"],
      sorter: (a, b) => new Date(a.birthdate) - new Date(b.birthdate),
      render: (birthdate) =>
        birthdate && <span>{dayjs(birthdate).format("MMM DD, YYYY")}</span>,
    },
    {
      title: <span className="student-table-header-label">Movement Date</span>,
      dataIndex: "movementDate",
      key: "movementDate",
      width: 100,
      responsive: ["xs", "md", "lg"],
      sorter: (a, b) => new Date(a.movementDate) - new Date(b.movementDate),
      render: (movementDate) =>
        movementDate && (
          <span>{dayjs(movementDate).format("MMM DD, YYYY")}</span>
        ),
    },
    {
      title: <span className="student-table-header-label">Action</span>,
      key: "action",
      className: "student-table-body-label",
      align: "center",
      width: 70,
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
  const setShowRightActionCard = (action) => {
    let selectedAction;
    switch (action.toLowerCase()) {
      case "attendance":
        selectedAction = leftRenderAttendanceData;
        setLeftRenderUi("attendance");
        break;
      case "activity":
        setLeftRenderUi("");
        setActivityIconSubMenuModalOpen(true);
        selectedAction = "";
        break;
      case "message":
        setLeftRenderUi("");
        setCreateMessageModalOpen(true);
        selectedAction = "";
        break;
      default:
        break;
    }

    setLeftRenderData(selectedAction); // return the data if needed
  };
  const handleModalOpen = (action) => {
    switch (action.toLowerCase()) {
      case "signin":
        setSignInModalOpen(true);
        break;
      case "signout":
        setSignOutModalOpen(true);
        break;
      case "transfer":
        setTransferModalOpen(true);
        break;
      case "absent":
        setMarkAbsentModalOpen(true);
        break;
      default:
        "";
        break;
    }
  };
  const renderLFloatingRightCard = () => (
    <div className="classroom-students-overview-l-overflow text-center">
      {leftRenderData.map((data, i) => (
        <div
          key={i}
          className=" d-flex flex-column align-items-center pointer"
          onClick={() => handleModalOpen(data?.modal)}
        >
          <img
            className="classroom-students-r-icon"
            src={data?.icon}
            alt={data?.label}
          />
          <div className="label-11-500 mt16 ">{data?.label}</div>
        </div>
      ))}
    </div>
  );

  const renderRFloatingRightCard = () => (
    <>
      <div className="classroom-students-overview-r-overflow">
        {isLeftRenderUi === "attendance" ? renderLFloatingRightCard() : <></>}
        {rightRenderData.map((data, i) => (
          <div
            key={i}
            className=" d-flex flex-column align-items-center pointer"
            onClick={() => setShowRightActionCard(data?.label)}
          >
            <img
              className="classroom-students-r-icon"
              src={data?.icon}
              alt={data?.label}
            />
            <div className="label-11-500 text-white mt16">{data?.label}</div>
          </div>
        ))}
      </div>
    </>
  );
  useEffect(() => {
    selectedRowKeys.length === 0 ? setLeftRenderUi("") : "";
  }, [selectedRowKeys.length]);

  return (
    <>
      <div className="mt20">
        <Card styles={{ body: { padding: 16 } }}>
          <div className="d-flex justify-content-between mb16">
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
                {Object.entries(selectedFilters)
                  .filter(
                    ([key, value]) => value !== null && value !== undefined
                  ) // Filter out null or undefined values
                  .map(([key, value]) => (
                    <Tag
                      key={key}
                      color="blue"
                      closable
                      onClose={() => handleClearSingleFilter(key)}
                    >
                      {`${key}: ${value}`}
                    </Tag>
                  ))}

                {Object.keys(selectedFilters).some(
                  (key) =>
                    selectedFilters[key] !== null &&
                    selectedFilters[key] !== undefined
                ) && (
                  <Tag
                    color="blue"
                    className="pointer"
                    onClick={handleClearAllFilters}
                  >
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

          {selectedRowKeys.length > 0 ? renderRFloatingRightCard() : <></>}
          <TableComponent
            columns={columns}
            dataSource={filteredData}
            tableSize={"small"}
            loading={isLoading}
            moduleName="Students"
            rowKey="key"
            sizeChanger={false}
            showTotalProp={true}
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedRowKeys) =>
                setSelectedRowKeys(selectedRowKeys),
            }}
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
            closeModal={() => setStudentTableFilterModalOpen(false)}
            onApplyFilter={handleApplyFilters}
            classrooms={classrooms}
            formValues={selectedFilters}
            // setFormValues={setSelectedFilters}
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
      {isActivityIconSubMenuModalOpen && (
        <CommonModalComponent
          open={isActivityIconSubMenuModalOpen}
          setOpen={setActivityIconSubMenuModalOpen}
          modalWidthSize={804}
          isClosable={true}
        >
          <ActivityIconSubMenu />
          {/* <ActivitySubMenu setCancel={setMarkAbsentModalOpen} /> */}
        </CommonModalComponent>
      )}
      {isCreateMessageModalOpen && (
        <CommonModalComponent
          open={isCreateMessageModalOpen}
          setOpen={setCreateMessageModalOpen}
          modalWidthSize={549}
        >
          <CreateMessage
            setCancel={setCreateMessageModalOpen}
            setAssignConfirm={setAssignConfirmModalOpen}
          />
        </CommonModalComponent>
      )}
    </>
  );
};

export default StudentOverviewTable;
