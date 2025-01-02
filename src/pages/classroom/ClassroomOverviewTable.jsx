import React, { useEffect, useState } from "react";
import { Select, Dropdown, Space, Form, Switch } from "antd";
import { IoIosMore } from "react-icons/io";
import TableComponent from "../../components/TableComponent";
import {
  generateClassroomData,
  generateClassroomDemoData,
  getInitialsTitle,
} from "../../services/common";
import { Link } from "react-router-dom";

import {
  useGetClassroomsBySchool,
  useUpdateClassroom,
} from "../../hooks/useClassroom";
import CommonModalComponent from "../../components/CommonModalComponent";
import CreateClassroom from "./CreateClassroom";
import DeletePopUp from "../../components/DeletePopUp";
import { CustomMessage } from "../../utils/CustomMessage";
import { useSession } from "../../hooks/useSession";

function ClassroomOverviewTable() {
  const { academyId } = useSession();
  const [selectedClassroom, setSelectedClassroom] = useState("all");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isCreateClassroomModalOpen, setCreateClassroomModalOpen] =
    useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showInactive, setShowInactive] = useState(false);
  const [currentClassroomId, setCurrentClassroomId] = useState(null);
  // const [loading, setLoading] = useState(false);
  const schoolId = academyId;
  const {
    data: classroomData,
    isLoading,
    isError,
    error,
  } = useGetClassroomsBySchool(schoolId);

  const { mutate: updateClassroom } = useUpdateClassroom();

  const handleDeleteModal = (id, name) => {
    setSelectedRecord({ id, name }); // Store the clicked item's id and name
    setDeleteModalOpen(true); // Open the delete modal
  };

  // Filter data when `showInactive` changes
  useEffect(() => {
    const filteredClassrooms = showInactive
      ? data?.filter(
          (classroom) => classroom.status.toLowerCase() === "inactive"
        )
      : data?.filter(
          (classroom) => classroom.status.toLowerCase() === "active"
        );
    setFilteredData(filteredClassrooms);
  }, [showInactive, classroomData]);

  useEffect(() => {
    if (classroomData) {
      // Format data using generateClassroomData if needed
      const formattedClassroomData = generateClassroomData(classroomData.data);

      // Set formatted data or fallback to demo data for testing
      setData(formattedClassroomData || generateClassroomDemoData(15));
      setFilteredData(
        formattedClassroomData?.filter(
          (classroom) => classroom.status.toLowerCase() === "active"
        )
      ); // Initially show all classrooms
    }
  }, [classroomData, isError, error]);

  // Handle classroom selection
  const onClassroomSelect = (value) => {
    setSelectedClassroom(value);

    if (value === "all") {
      const filteredClassrooms = showInactive
        ? data?.filter(
            (classroom) => classroom.status.toLowerCase() === "inactive"
          )
        : data?.filter(
            (classroom) => classroom.status.toLowerCase() === "active"
          );
      setFilteredData(filteredClassrooms); // Show all data
    } else {
      // Filter the data by the selected classroom
      const filtered = data.filter((item) => item.name === value);
      setFilteredData(filtered);
    }
  };

  // Handle action click (Edit, Assign, Manage)
  const onActionClick = (action, record) => {
    if (action === "edit") {
      setCurrentClassroomId(record.key); // Set the selected classroom's ID
      setCreateClassroomModalOpen(true); // Open the modal
    } else if (action === "delete") {
      const formData = new FormData();
      formData.append("isDeleted", true);
      const classroomId = record.key;
      updateClassroom({ classroomId, classroomData: formData });
    } else {
      // console.log(action, record);
    }
  };

  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append("isDeleted", true);

    try {
      // await updateClassroom.mutateAsync({
      //   classroomId: id,
      //   classroomData: formData
      // });
      // CustomMessage.success("Classroom deleted successfully!");
      await new Promise((resolve, reject) => {
        updateClassroom(
          { classroomId: id, classroomData: formData },
          { onSuccess: resolve, onError: reject }
        );
      });
      CustomMessage.success("Classroom deleted successfully!");
      setSelectedClassroom("all");
    } catch (error) {
      CustomMessage.error(`Failed to delete classroom: ${error.message}`);
    } finally {
      setDeleteModalOpen(false); // Close the modal after operation (success or failure)
    }
  };

  // Remove duplicate classrooms based on the `name`
  const uniqueClassrooms = [
    { value: "all", label: "All Classrooms" },
    ...Array.from(
      new Set(
        (showInactive
          ? data?.filter(
              (classroom) => classroom.status.toLowerCase() === "inactive"
            )
          : data?.filter(
              (classroom) => classroom.status.toLowerCase() === "active"
            )
        ).map((item) => item.name)
      )
    )
      .map((name) => {
        return data.find(
          (item) =>
            item.name === name &&
            (showInactive
              ? item.status.toLowerCase() === "inactive"
              : item.status.toLowerCase() === "active")
        );
      })
      .map((item) => ({
        value: item.name,
        label: item.name,
      })),
  ];

  const columns = [
    {
      title: <></>,
      dataIndex: "name",
      key: "name",
      width: 200,
      children: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          fixed: "left",
          align: "left",
          className: "name-column label-14-600",
          render: (text, record) => (
            <Space>
              {record?.color?.startsWith("#") ? (
                // Display a colored circle if record.color is a color code
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                  style={{
                    backgroundColor: record.color,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#ffffff",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {getInitialsTitle(record.name)}
                </div>
              ) : (
                // Display an image if record.color is a URL
                <img
                  src={record.color}
                  alt={text}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
              <Link
                to="/classroom-profile"
                state={{
                  classroomId: record.key,
                  name: record.name,
                }}
              >
                <span className="label-14-500 truncate-text">{text}</span>
              </Link>
            </Space>
          ),
        },
        {
          title: "Capacity",
          dataIndex: "capacity",
          key: "capacity",
          className: "name-column label-14-600",
          align: "center",
          render: (text) => <span className="label-14-500">{text}</span>,
        },
        {
          title: "FTE",
          dataIndex: "fte",
          key: "fte",
          className: "name-column label-14-600",
          align: "center",
          render: (text) => <span className="label-14-500">{text}</span>,
        },
      ],
    },

    {
      title: "Students",
      className: "students-column label-14-600",
      align: "center",
      children: [
        {
          title: "Active",
          dataIndex: "active",
          key: "active",
          align: "center",
          className: "students-column label-14-600",
          render: (text) => <span className="label-14-500">{text}</span>,
        },
        {
          align: "center",
          title: "Upcoming",
          dataIndex: "upcoming",
          key: "upcoming",
          className: "students-column label-14-600",
          render: (text) => <span className="label-14-500">{text}</span>,
        },
        {
          align: "center",
          title: "Present",
          dataIndex: "present",
          key: "present",
          className: "students-column label-14-600",
          render: (text) => <span className="label-14-500">{text}</span>,
        },
      ],
    },
    {
      title: "Staff",
      className: "staff-column label-14-600",
      align: "center",
      children: [
        {
          align: "center",
          title: "Assigned",
          dataIndex: "assignedStaff",
          key: "assignedStaff",
          className: "staff-column label-14-600",
          render: (text) => <span className="label-14-500">{text}</span>,
        },
        {
          align: "center",
          title: "Present",
          dataIndex: "presentStaff",
          key: "presentStaff",
          className: "staff-column label-14-600",
          render: (text) => <span className="label-14-500">{text}</span>,
        },
      ],
    },
    {
      title: "Ratio",
      className: "ratio-column label-14-600 ",
      align: "center",
      children: [
        {
          title: "Current",
          dataIndex: "ratio",
          key: "status",
          align: "center",
          className: "ratio-column label-14-600",
          render: (status) =>
            status === "warning" ? (
              <img
                src="/wow_icons/png/thumb_down.png"
                className="classroom-table-thumb"
              />
            ) : (
              <img
                src="/wow_icons/png/thumb_up.png"
                className="classroom-table-thumb"
              />
            ),
        },
      ],
    },
    {
      title: "",
      key: "action",
      children: [
        {
          title: "Action",
          key: "action",
          align: "center",
          className: "label-14-600",
          render: (_, record) => (
            <Dropdown
              menu={{
                items: [
                  { key: "edit", label: "Edit Classroom" },
                  {
                    key: "delete",
                    onClick: () => handleDeleteModal(record.key, record.name),
                    label: "Delete Classroom",
                  },
                  { key: "assign", label: "Assign Students" },
                  { key: "manage", label: "Manage Staff" },
                ],
                onClick: ({ key }) => {
                  if (key !== "delete") {
                    onActionClick(key, record); // call directly for non-delete actions
                  }
                },
              }}
              // trigger={["click"]}
            >
              <IoIosMore className="pointer" />
            </Dropdown>
          ),
        },
      ],
    },
  ];
  return (
    <>
      <div className="card">
        <div className="d-flex justify-content-between align-items-center mr25  mt12 px-2">
          <div className="ml">
            <Select
              border={false}
              value={selectedClassroom}
              onChange={onClassroomSelect}
              className="select-classroom label-14-500"
              style={{ width: 276, height: 40, border: "none" }}
              placeholder="Select Classroom"
              options={uniqueClassrooms} // Use uniqueClassrooms for dropdown options
            />
          </div>
          <div className="align-items-center">
            <Form.Item
              name="active"
              valuePropName="checked"
              className="mb-0 me-2 classroom-show-inactive-toggle-btn"
            >
              <Switch
                checked={showInactive}
                onChange={(checked) => {
                  setShowInactive(checked);
                  setSelectedClassroom("all");
                }}
              />
              <span className="classroom-inactive-label ml20">
                Show Inactive
              </span>
            </Form.Item>
          </div>
        </div>
        <div className=" px-2 py-2 classroom-table">
          <TableComponent
            columns={columns}
            dataSource={filteredData}
            moduleName="Classrooms"
            loading={isLoading}
            showTotalProp={true}
          />
        </div>
      </div>
      {isCreateClassroomModalOpen && (
        <CommonModalComponent
          open={isCreateClassroomModalOpen}
          setOpen={setCreateClassroomModalOpen}
          modalWidthSize={418}
          modalHeightSize={498}
          isClosable={true}
        >
          <CreateClassroom
            CardTitle={"Edit Classroom"}
            classroomId={currentClassroomId}
            closeModal={() => {
              setCreateClassroomModalOpen(false);
              setShowInactive(false);
            }} // Passing the close function
          />
        </CommonModalComponent>
      )}
      {isDeleteModalOpen && (
        <CommonModalComponent
          open={isDeleteModalOpen}
          setOpen={setDeleteModalOpen}
          modalWidthSize={493}
          modalHeightSize={280}
          isClosable={false}
        >
          <DeletePopUp
            setCancel={setDeleteModalOpen}
            deleteData={selectedRecord}
            // CardTitle="Delete Classroom"
            handleDelete={handleDelete} // Pass the updated handleDelete function
            module="Classroom"
          />
        </CommonModalComponent>
      )}
    </>
  );
}

export default ClassroomOverviewTable;
