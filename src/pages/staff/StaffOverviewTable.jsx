import React, { useState } from "react";
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
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import TableComponent from "../../components/TableComponent";
import CommonModalComponent from "../../components/CommonModalComponent";
import DeletePopUp from "../../components/DeletePopUp";
import ApplyFilter from "../student/ApplyFilter";
import ButtonComponent from "../../components/ButtonComponent";
import CreateStaff from "./CreateStaff";
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { getInitialsTitle } from "../../services/common";

const { Text } = Typography;

const staffData = [
  {
    key: "1",
    name: "Aparna Biwalkar",
    avatar: "/placeholder.svg?height=40&width=40",
    primaryClass: "1-Blue-D",
    subClassroomCount: 3,
    subClass: [
      { id: 1, class: "1-Pink-E" },
      { id: 2, class: "2-Pink-G" },
      { id: 3, class: "1-Red-D" },
    ],
    designation: "Admin",
    schedule: {
      Mon: {
        workHours: "7:30 AM -5:30 PM",
        breakTime: "12:30 PM -1:00 PM",
      },
      Tue: null,
      Wed: {
        workHours: "7:30 AM -5:30 PM",
        breakTime: "12:30 PM -1:00 PM",
      },
      Thu: null,
      Fri: {
        workHours: "7:30 AM -5:30 PM",
        breakTime: "12:30 PM -1:00 PM",
      },
    },
    email: "aparna12345@wiseowl.academy",
    phone: "(986) 027-1627",
    isOnline: true,
  },
];

const StaffOverviewTable = () => {
  const [isCreateStaffModalOpen, setCreateStaffModalOpen] = useState(false);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleSelectAll = (checked) => {
    setSelectedRowKeys(checked ? staffData.map((item) => item.key) : []);
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

  const handleDelete = () => {
    console.log("Deleted record:", selectedRecord);
    setDeleteModalOpen(false);
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
              selectedRowKeys.length < staffData.length
            }
            checked={selectedRowKeys.length === staffData.length}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
          <span style={{ marginLeft: 8 }}>Staff Name</span>
        </div>
      ),
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={selectedRowKeys.includes(record.key)}
            onChange={(e) => handleRowSelection(record.key, e.target.checked)}
          />
          <div style={{ position: "relative", marginLeft: 8 }}>
            <Avatar size={24}>{getInitialsTitle(text)}</Avatar>
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
          <Link to={`/staff-profile/${record.key}`} style={{ marginLeft: 8 }}>
            {text}
          </Link>
        </div>
      ),
    },
    {
      title: "Classroom",
      dataIndex: "primaryClass",
      key: "primaryClass",
      align: "start",
      render: (text, record) => (
        <div>
          <Avatar size={24}>{getInitialsTitle(text)}</Avatar>

          <span className="ml9 staff-table--body-label">{text}</span>
          {record.subClass && (
            <Popover
              color="#d9ffcb66"
              content={record.subClass.map((item) => (
                <div className="plus-number-count-label" key={item.id}>
                  {item.class}
                </div>
              ))}
            >
              <Tag className="no-border-tag plus-number-count">{`+${record.subClassroomCount}`}</Tag>
            </Popover>
          )}
        </div>
      ),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      align: "start",
      render: (text, _) => (
        <span className="staff-table--body-label">{text}</span>
      ),
    },
    {
      title: "Schedule",
      dataIndex: "schedule",
      key: "schedule",
      align: "start",
      render: (schedule) =>
        ["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
          <Tooltip
            color="#F3F2FF"
            key={day}
            title={getTooltipContent(day, schedule[day])}
            placement="bottom"
            className="no-border-tag"
          >
            <Tag
              color={schedule[day] ? "#B1AFE94D" : "default"}
              style={{ color: "#1B237E" }}
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
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                label: "Edit",
                icon: <EditOutlined />,
              },
              {
                key: "delete",
                label: "Delete",
                icon: <DeleteOutlined />,
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

  return (
    <>
      <div className="mt20">
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
            dataSource={staffData}
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
            }}
            tableSize="small"
          />
        </Card>
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
          >
            <ApplyFilter
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
          >
            <DeletePopUp
              deleteData={selectedRecord}
              handleDelete={handleDelete}
            />
          </CommonModalComponent>
        )}
      </div>
    </>
  );
};

export default StaffOverviewTable;
