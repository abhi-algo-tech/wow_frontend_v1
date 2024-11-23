import React, { useState } from "react";
import {
  Input,
  Button,
  Checkbox,
  Tag,
  Avatar,
  Dropdown,
  Card,
  Space,
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

const staffData = [
  {
    key: "1",
    name: "Aparna Biwalkar",
    avatar: "/placeholder.svg?height=40&width=40",
    classroom: "Office",
    plusCount: 3,
    designation: "Admin",
    email: "aparna12345@wiseowl.academy",
    phone: "(986) 027-1627",
    isOnline: true,
  },
  {
    key: "2",
    name: "Chaitanya Bhave",
    avatar: "/placeholder.svg?height=40&width=40",
    classroom: "Office",
    plusCount: 1,
    designation: "Admin",
    email: "chaitanyabhave124@wiseowl.academy",
    phone: "(986) 027-1627",
    isOnline: true,
  },
  {
    key: "3",
    name: "Riken Mehta",
    avatar: "/placeholder.svg?height=40&width=40",
    classroom: "Office",
    designation: "Admin",
    email: "riken12@wiseowl.academy",
    phone: "(986) 027-1627",
    isOnline: true,
  },
  {
    key: "4",
    name: "Satya Vani Kanumuri",
    avatar: "/placeholder.svg?height=40&width=40",
    classroom: "Office",
    designation: "Admin",
    email: "satya17@wiseowl.academy",
    phone: "(986) 027-1627",
    isOnline: true,
  },
  {
    key: "5",
    name: "Spandana Marri",
    avatar: "/placeholder.svg?height=40&width=40",
    classroom: "Office",
    plusCount: 1,
    designation: "Admin",
    email: "spandana16@wiseowl.academy",
    phone: "(986) 027-1627",
    isOnline: true,
  },
  {
    key: "6",
    name: "Suhas Biwalkar Admin",
    avatar: "/placeholder.svg?height=40&width=40",
    classroom: "Office",
    plusCount: 2,
    designation: "Admin",
    email: "suhas13@wiseowl.academy",
    phone: "(986) 027-1627",
    isOnline: true,
  },
  {
    key: "7",
    name: "Swara Joshi",
    avatar: "/placeholder.svg?height=40&width=40",
    classroom: "Office",
    designation: "Admin",
    email: "swara43@wiseowl.academy",
    phone: "(986) 027-1627",
    isOnline: true,
  },
  {
    key: "8",
    name: "Shubham Naik",
    avatar: "/placeholder.svg?height=40&width=40",
    classroom: "Office",
    designation: "Admin",
    email: "shubham86@wiseowl.academy",
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

  const handleSelectAll = (checked) => {
    if (checked) {
      // Select all row keys
      const allRowKeys = staffData.map((item) => item.key);
      setSelectedRowKeys(allRowKeys);
    } else {
      // Deselect all row keys
      setSelectedRowKeys([]);
    }
  };

  const handleRowSelection = (key, checked) => {
    if (checked) {
      // Add the key to the selected keys
      setSelectedRowKeys([...selectedRowKeys, key]);
    } else {
      // Remove the key from the selected keys
      setSelectedRowKeys(
        selectedRowKeys.filter((selectedKey) => selectedKey !== key)
      );
    }
  };

  const handleDeleteModal = (id, name) => {
    setSelectedRecord({ id, name });
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    console.log("Deleted record:", selectedRecord);
    setDeleteModalOpen(false);
  };

  const columns = [
    {
      title: (
        <div className="d-flex align-items-center">
          <Checkbox
            indeterminate={
              selectedRowKeys.length > 0 &&
              selectedRowKeys.length < staffData.length
            }
            checked={selectedRowKeys.length === staffData.length}
            onChange={(e) => {
              handleSelectAll(e.target.checked);
            }}
          />
          <span style={{ marginLeft: 8 }}>Staff Name</span>
        </div>
      ),
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          <Checkbox
            checked={selectedRowKeys.includes(record.key)}
            onChange={(e) => {
              handleRowSelection(record.key, e.target.checked);
            }}
          />
          <div style={{ position: "relative", marginLeft: 8 }}>
            <Avatar src={record.avatar} />
            {record.isOnline && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 8,
                  height: 8,
                  backgroundColor: "#52c41a",
                  borderRadius: "50%",
                  border: "2px solid white",
                }}
              />
            )}
          </div>
          <Link to={`/staff-profile/${record.key}`}>
            <span style={{ marginLeft: 8 }}>{text}</span>
          </Link>
        </div>
      ),
    },

    {
      title: "Classroom",
      dataIndex: "classroom",
      key: "classroom",
      align: "start",
      render: (text, record) => (
        <>
          <Tag color="purple">{text}</Tag>
          {record.plusCount && <Tag color="success">+{record.plusCount}</Tag>}
        </>
      ),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      align: "start",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "start",
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
          trigger={["click"]}
        >
          <IoIosMore className="pointer" />
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
