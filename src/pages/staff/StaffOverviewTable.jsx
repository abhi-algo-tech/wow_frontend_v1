import React, { useEffect, useMemo, useState } from "react";
import {
  Input,
  Checkbox,
  Tag,
  Avatar,
  Dropdown,
  Card,
  Typography,
  Popover,
  Tooltip,
  Space,
  Form,
  Switch,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TableComponent from "../../components/TableComponent";
import CommonModalComponent from "../../components/CommonModalComponent";
import DeletePopUp from "../../components/DeletePopUp";
import ButtonComponent from "../../components/ButtonComponent";
import CreateStaff from "./CreateStaff";
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { getInitialsTitleWithColor } from "../../services/common";
import { useGetAllStaff, useUpdateStaff } from "../../hooks/useStaff";
import { generateStaffData } from "./CommonStaff";
import { CustomMessage } from "../../utils/CustomMessage";
import StaffFilter from "./StaffFilter";
import SignOut from "../../components/attendance/SignOut";
import CreateMessage from "../../components/message/CreateMessage";

const { Text } = Typography;

const StaffOverviewTable = () => {
  const [isCreateStaffModalOpen, setCreateStaffModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    classroom: null,
    designation: null,
    status: null,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showAttendanceCard, setShowAttendanceCard] = useState(false);
  const [isSignOutModalOpen, setSignOutModalOpen] = useState(false);
  const [isCreateMessageModalOpen, setCreateMessageModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showActive, setShowActive] = useState(true);
  const [classrooms, setClassrooms] = useState([]);

  const { data: staff, isLoading, isError, error } = useGetAllStaff();
  const updateStaffMutation = useUpdateStaff();

  useEffect(() => {
    if (staff) {
      const formattedStaffData = generateStaffData(staff.data);
      setData(formattedStaffData);
      setFilteredData(formattedStaffData);
    }

    if (isError) {
      CustomMessage.error(
        "Failed to load staff details. Please try again later."
      );
      console.error("Error fetching staff details:", error);
    }
  }, [staff, isError, error]);

  // Helper functions for filtering data
  const getFilteredDataByStatus = (data, status) =>
    data?.filter((staff) => staff.status?.toLowerCase() === status) || [];

  const getFilteredData = (data, showActive) =>
    showActive
      ? getFilteredDataByStatus(data, "active").concat(
          getFilteredDataByStatus(data, "upcoming")
        )
      : getFilteredDataByStatus(data, "inactive");

  // Memoized filtered data based on showActive
  const baseFilteredStaffs = useMemo(
    () => getFilteredData(data || [], showActive),
    [showActive, data]
  );
  // console.log("baseFilteredStaffs", baseFilteredStaffs);

  // Combine search and funnel filtering
  const finalFilteredData = useMemo(() => {
    // Filter by search query
    const searchFiltered = searchQuery
      ? baseFilteredStaffs.filter((staff) =>
          staff.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : baseFilteredStaffs;

    // Apply funnel filters if present
    if (
      Object.values(selectedFilters).every(
        (value) => value === null || value === ""
      )
    ) {
      return searchFiltered;
    }

    if (
      (showActive && selectedFilters?.status?.toLowerCase() === "inactive") ||
      (!showActive &&
        ["active", "upcoming"].includes(selectedFilters?.status?.toLowerCase()))
    ) {
      return [];
    }

    return searchFiltered.filter((staff) => {
      const hasClassroomMatch = selectedFilters?.classroom
        ? staff.primaryClass === selectedFilters.classroom ||
          staff.subClass.some((sub) => sub.name === selectedFilters.classroom)
        : true;

      const hasStatusMatch = selectedFilters?.status
        ? staff.status?.toLowerCase() === selectedFilters.status?.toLowerCase()
        : true;

      const hasDesignationMatch = selectedFilters?.designation
        ? staff.designation?.toLowerCase() ===
          selectedFilters.designation?.toLowerCase()
        : true;

      return hasClassroomMatch && hasStatusMatch && hasDesignationMatch;
    });
  }, [baseFilteredStaffs, searchQuery, selectedFilters, showActive]);

  // Extract classroom name and key and push into state
  const classroomData = data.flatMap((item) => {
    // Include the primary class
    const primaryClass = {
      name: item.primaryClass,
      id: item.key,
    };

    // Map subClass array
    const subClasses = item.subClass.map((sub) => ({
      name: sub.name,
      id: sub.id,
    }));

    // Combine primary class and subclasses
    return [primaryClass, ...subClasses];
  });

  // Remove duplicates based on the `name` property
  const uniqueClassroomData = Array.from(
    new Map(classroomData.map((item) => [item.name, item])).values()
  );

  // Update the filtered data state whenever the final filtered data changes
  useEffect(() => {
    setFilteredData(finalFilteredData);

    // Set the state with the unique classroom data
    setClassrooms(uniqueClassroomData);
  }, [finalFilteredData]);
  // console.log("classrooms", classrooms);

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
  const handleDeleteModal = (id, name) => {
    setSelectedRecord({ id, name });
    setDeleteModalOpen(true);
  };

  const handleApplyFilters = (filter) => {
    setSelectedFilters(filter);
  };

  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append("isDeleted", true);

    try {
      await updateStaffMutation.mutateAsync({
        staffId: id,
        staffData: formData,
      });
      CustomMessage.success("Staff deleted successfully!");
      setDeleteModalOpen(false); // Close the modal after deletion
    } catch (error) {
      CustomMessage.error(`Failed to delete staff: ${error.message}`);
      setDeleteModalOpen(false);
    }
  };

  const handleEditModal = (data) => {
    setSelectedStaffId(data.key); // Store the clicked item's id and name
    setEditModalOpen(true); // Open the delete modal
  };

  const getTooltipContent = (day, times) => {
    if (!times) return null;
    const dayName =
      day === "Mon"
        ? "Monday"
        : day === "Tue"
        ? "Tuesday"
        : day === "Wed"
        ? "Wednesday"
        : day === "Thu"
        ? "Thursday"
        : "Friday";
    return (
      <div
        style={{
          color: "#ffffff",
          padding: "12px",
          fontSize: "14px",
          lineHeight: "1.6",
        }}
      >
        <div className="schedule-tool-label">{dayName}</div>
        <div className="schedule-tool-sub-label">W- {times.workHours}</div>
        <div className="schedule-tool-sub-label">B- {times.breakTime}</div>
      </div>
    );
  };

  const columns = [
    {
      title: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginLeft: 8 }}>Staff Name</span>
        </div>
      ),
      dataIndex: "name",
      key: "name",
      width: 230,
      defaultSortOrder: "ascend",
      className: "label-14-600",
      sorter: (a, b) => a.name.localeCompare(b.name), // Sorting by staff name alphabetically
      render: (text, record) => (
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="label-14-500"
        >
          <div style={{ position: "relative", marginLeft: 8 }}>
            <Avatar
              size={24}
              style={{
                backgroundColor:
                  getInitialsTitleWithColor(text).backgroundColor,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {getInitialsTitleWithColor(text).initials}
            </Avatar>
            {record.isOnline && (
              <div
                style={{
                  position: "absolute",
                  top: -3,
                  right: -1,
                  width: 10,
                  height: 10,
                  backgroundColor: "#52c41a",
                  borderRadius: "50%",
                  border: "2px solid white",
                }}
              />
            )}
          </div>
          <Link
            to="/staff-profile"
            state={{
              staffId: record.key,
              name: record.name,
            }}
            style={{ marginLeft: 8 }}
          >
            <span className="label-14-500">{text}</span>
          </Link>
        </div>
      ),
    },
    {
      title: "Classroom",
      dataIndex: "primaryClass",
      key: "primaryClass",
      align: "start",
      width: 200,
      className: "label-14-600",
      sorter: (a, b) => a.primaryClass.localeCompare(b.primaryClass), // Sorting by classroom name alphabetically
      render: (text, record) => (
        <div
          onMouseEnter={() => setHoveredRow(record.key)}
          onMouseLeave={() => setHoveredRow(null)}
          className="d-flex justify-content-between"
        >
          <div>
            <Avatar
              size={24}
              style={{
                backgroundColor:
                  getInitialsTitleWithColor(text).backgroundColor,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {getInitialsTitleWithColor(text).initials}
            </Avatar>

            <span className="ml9 staff-table--body-label">{text}</span>
            {record.subClass[0] && (
              <Popover
                color="#F0FFEA"
                content={record.subClass.map((item) => (
                  <div className="plus-number-count-label" key={item.name}>
                    {item.name}
                  </div>
                ))}
              >
                <Tag className="no-border-tag plus-number-count label-12-400">{`+${record.subClassroomCount}`}</Tag>
              </Popover>
            )}
          </div>
          {hoveredRow === record.key && (
            <div className="text-start">
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
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      align: "start",
      className: "label-14-600",
      sorter: (a, b) => a.designation.localeCompare(b.designation), // Sorting by designation alphabetically
      render: (text, _) => (
        <span className="staff-table--body-label">{text}</span>
      ),
    },
    // {
    //   title: "Schedule",
    //   dataIndex: "schedule",
    //   key: "schedule",
    //   align: "start",
    //   className: "label-14-600",
    //   width: 280,
    //   render: (schedule) =>
    //     ["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
    //       <Tooltip
    //         color="#F3F2FF"
    //         key={day}
    //         title={getTooltipContent(day, schedule[day])}
    //         className="no-border-tag "
    //       >
    //         <Tag
    //           color={schedule[day] ? "#B1AFE94D" : "default"}
    //           style={{ color: "#1B237E" }}
    //           className="label-12-400"
    //         >
    //           {day}
    //         </Tag>
    //       </Tooltip>
    //     )),
    // },
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
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      align: "start",
      width: 130,
      className: "label-14-600",
      render: (text) => <span className="label-14-500">{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      width: 70,
      align: "center",
      className: "label-14-600",
      render: (_, record) => (
        <Dropdown
          className="pointer"
          menu={{
            items: [
              {
                key: "edit",
                label: "Edit",
                // icon: <EditOutlined />,
                onClick: () => handleEditModal(record),
              },
              {
                key: "delete",
                label: "Delete",
                // icon: <DeleteOutlined />,
                onClick: () => handleDeleteModal(record.key, record.name),
              },
            ],
          }}
        >
          <IoIosMore />
        </Dropdown>
      ),
    },
  ];
  const renderAttendanceFloatingRightCard = () => (
    <Card
      className="staff-attendance-overflowborder"
      styles={{ body: { padding: 10, borderRadius: 8 } }}
      onClick={() => setShowAttendanceCard(false)}
    >
      <div className="overflowborder-icon-label">
        <div>
          <img
            className="overflowBorder-icon"
            src="/classroom_icons/png/Sign in.png"
          />
        </div>
        <div className="label-11-500">Sign In</div>
      </div>
      <div
        className="overflowborder-icon-label"
        onClick={() => setSignOutModalOpen(true)}
      >
        <div>
          <img
            className="overflowBorder-icon"
            src="/classroom_icons/png/Sign out.png"
          />
        </div>
        <div className="label-11-500">Sign Out</div>
      </div>
      <div className="overflowborder-icon-label">
        <div>
          <img
            className="overflowBorder-icon"
            src="/classroom_icons/png/transfer.png"
          />
        </div>
        <div className="label-11-500">Transfer</div>
      </div>
      <div className="overflowborder-icon-label">
        <div>
          <img
            className="overflowBorder-icon"
            src="/classroom_icons/png/Mark absent.png"
          />
        </div>
        <div className="label-11-500">Absent</div>
      </div>
    </Card>
  );
  const renderFloatingRightCard = () => (
    <>
      {showAttendanceCard && renderAttendanceFloatingRightCard()}
      <div className="staff-overflowborder">
        <div
          className="staff-overflowborder-icon-label d-flex flex-column align-items-center pointer"
          onClick={() => setShowAttendanceCard(true)}
        >
          <img
            className="staff-overflowBorder-icon mt16"
            src="/wow_icons/png/Attendance-staff-table.png"
            alt="Attendance"
          />
          <div className="label-11-500 text-white">Attendance</div>
        </div>
        <div
          className="staff-overflowborder-icon-label d-flex flex-column align-items-center pointer"
          onClick={() => setCreateMessageModalOpen(true)}
        >
          <img
            className="staff-overflowBorder-icon"
            src="/wow_icons/png/message.png"
            alt="message"
          />
          <div className="label-11-500 text-white">Message</div>
        </div>
      </div>
    </>
  );
  useEffect(() => {
    selectedRowKeys.length === 0 ? setShowAttendanceCard(false) : "";
  }, [selectedRowKeys.length]);
  return (
    <>
      <div className="mt20">
        <div style={{ position: "relative" }}>
          <Card>
            <div className="d-flex justify-content-between mb16">
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                {selectedRowKeys.length > 0 ? renderFloatingRightCard() : <></>}
                <Input
                  placeholder="Search Staff"
                  prefix={<SearchOutlined style={{ color: "#a0aec0" }} />}
                  style={{ minWidth: "240px", height: 40 }}
                  onChange={handleSearchChange}
                />
                <Space>
                  <Avatar
                    onClick={() => setFilterModalOpen(true)}
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
              <div className="d-flex align-items-center gap8">
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
              </div>
            </div>
            <TableComponent
              columns={columns}
              dataSource={filteredData}
              loading={isLoading}
              moduleName="Staff"
              rowSelection={{
                selectedRowKeys,
                onChange: setSelectedRowKeys,
              }}
              tableSize="small"
              showTotalProp={true}
            />
          </Card>
        </div>

        {isFilterModalOpen && (
          <CommonModalComponent
            open={isFilterModalOpen}
            setOpen={setFilterModalOpen}
            modalWidthSize={600}
            modalHeightSize={253}
            isClosable={true}
          >
            <StaffFilter
              CardTitle={"Staff Filter"}
              closeModal={() => setFilterModalOpen(false)}
              onApplyFilter={handleApplyFilters}
              classrooms={classrooms}
              formValues={selectedFilters}
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
              // CardTitle="Delete Staff"
              handleDelete={handleDelete} // Pass the updated handleDelete function
              module="Staff"
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
            <CreateStaff
              CardTitle={"Edit Staff"}
              staffId={selectedStaffId}
              closeModal={() => setEditModalOpen(false)}
              module="Staff"
              setCancel={setDeleteModalOpen}
            />
          </CommonModalComponent>
        )}
        {isSignOutModalOpen && (
          <CommonModalComponent
            open={isSignOutModalOpen}
            setOpen={setSignOutModalOpen}
            modalWidthSize={549}
          >
            <SignOut setCancel={setSignOutModalOpen} />
          </CommonModalComponent>
        )}
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
    </>
  );
};

export default StaffOverviewTable;
