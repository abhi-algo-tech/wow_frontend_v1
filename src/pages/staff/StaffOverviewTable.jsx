import React, { useEffect, useState } from "react";
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
  const [selectedFilters, setSelectedFilters] = useState({});
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

  const { data: staff, isLoading, isError, error } = useGetAllStaff();
  const updateStaffMutation = useUpdateStaff();

  useEffect(() => {
    if (staff) {
      const formattedStudentData = generateStaffData(staff.data);
      console.log("formattedStudentData:", formattedStudentData);
      setData(formattedStudentData);
      setFilteredData(formattedStudentData);
    }

    if (isError) {
      CustomMessage.error(
        "Failed to load staff details. Please try again later."
      );
      console.error("Error fetching staff details:", error);
    }
  }, [staff, isError, error]);

  const handleSelectAll = (checked) => {
    setSelectedRowKeys(checked ? filteredData.map((item) => item.key) : []);
  };

  const handleRowSelection = (key, checked) => {
    setSelectedRowKeys((prev) =>
      checked
        ? [...prev, key]
        : prev.filter((selectedKey) => selectedKey !== key)
    );
  };

  const handleDeleteModal = (id, name) => {
    setSelectedRecord({ id, name });
    setDeleteModalOpen(true);
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
          <Checkbox
            indeterminate={
              selectedRowKeys.length > 0 &&
              selectedRowKeys.length < filteredData.length
            }
            checked={selectedRowKeys.length === filteredData.length}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
          <span style={{ marginLeft: 8 }}>Staff Name</span>
        </div>
      ),
      dataIndex: "name",
      key: "name",
      width: 250,
      className: "label-14-600",
      sorter: (a, b) => a.name.localeCompare(b.name), // Sorting by staff name alphabetically
      render: (text, record) => (
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="label-14-500"
        >
          <Checkbox
            checked={selectedRowKeys.includes(record.key)}
            onChange={(e) => handleRowSelection(record.key, e.target.checked)}
          />
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
    {
      title: "Schedule",
      dataIndex: "schedule",
      key: "schedule",
      align: "start",
      className: "label-14-600",
      width: 280,
      render: (schedule) =>
        ["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
          <Tooltip
            color="#F3F2FF"
            key={day}
            title={getTooltipContent(day, schedule[day])}
            className="no-border-tag "
          >
            <Tag
              color={schedule[day] ? "#B1AFE94D" : "default"}
              style={{ color: "#1B237E" }}
              className="label-12-400"
            >
              {day}
            </Tag>
          </Tooltip>
        )),
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

  return (
    <>
      <div className="mt20">
        <div style={{ position: "relative" }}>
          {selectedRowKeys.length > 0 ? renderFloatingRightCard() : <></>}

          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Input
                  placeholder="Search by Staff"
                  prefix={<SearchOutlined />}
                  style={{ width: 240, height: 40 }}
                  onChange={handleSearchChange}
                />
                <Avatar
                  src="/wow_icons/png/mdi_filter.png"
                  onClick={() => setFilterModalOpen(true)}
                  className="pointer"
                />
                {Object.entries(selectedFilters).map(([key, value]) => (
                  <Tag
                    key={key}
                    closable
                    onClose={() =>
                      setSelectedFilters((prev) => {
                        const updated = { ...prev };
                        delete updated[key];
                        return updated;
                      })
                    }
                  >
                    {`${key}: ${value}`}
                  </Tag>
                ))}
              </div>
              <div className="text-end">
                <ButtonComponent
                  text="Add Staff"
                  buttonActionType="create"
                  gradient
                  onClick={() => setCreateStaffModalOpen(true)}
                />
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

        {isCreateStaffModalOpen && (
          <CommonModalComponent
            open={isCreateStaffModalOpen}
            setOpen={setCreateStaffModalOpen}
            modalWidthSize={418}
            isClosable={true}
          >
            <CreateStaff
              CardTitle={"Add Staff"}
              closeModal={() => setCreateStaffModalOpen(false)}
            />
          </CommonModalComponent>
        )}
        {isFilterModalOpen && (
          <CommonModalComponent
            open={isFilterModalOpen}
            setOpen={setFilterModalOpen}
            isClosable={true}
          >
            <StaffFilter
              CardTitle={"Staff Filter"}
              onApplyFilter={setSelectedFilters}
              closeModal={() => setFilterModalOpen(false)}
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
