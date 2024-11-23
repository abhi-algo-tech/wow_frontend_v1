// import React, { useEffect, useState } from "react";
// import { Select, Tag, Dropdown, Space } from "antd";
// import { IoIosMore } from "react-icons/io";
// import TableComponent from "../../components/TableComponent";
// import { generateClassroomData, getInitialsTitle } from "../../services/common";
// import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
// import { Link } from "react-router-dom";

// function ClassroomOverviewTable() {
//   const [selectedClassroom, setSelectedClassroom] = useState("all");
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   // Pagination state
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 10,
//     total: 6,
//   });

//   // Generate classroom data
//  useEffect(() => {
//     const classroomData = generateClassroomData(20);
//     setData(classroomData);
//     setFilteredData(classroomData); // Initially show all classrooms
//   }, []);

//   // Handle classroom selection
//   const onClassroomSelect = (value) => {
//     setSelectedClassroom(value);

//     if (value === "all") {
//       setFilteredData(data); // Show all data
//     } else {
//       // Filter the data by the selected classroom
//       const filtered = data.filter((item) => item.name === value);
//       setFilteredData(filtered);
//     }
//   };

//   // Handle action click (Edit, Assign, Manage)
//   const onActionClick = (action, record) => {
//     console.log(action, record);
//   };

//   // Remove duplicate classrooms based on the `name`
//   const uniqueClassrooms = [
//     { value: "all", label: "All Classrooms" },
//     ...Array.from(
//       new Set(data.map((item) => item.name)) // Ensure uniqueness based on name
//     )
//       .map((name) => {
//         return data.find((item) => item.name === name); // Find unique items based on the name
//       })
//       .map((item) => ({
//         value: item.name,
//         label: item.name,
//       })),
//   ];

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       fixed: "left",
//       align: "left",
//       render: (text, record) => (
//         <Space>
//           <div
//             className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
//             style={{
//               backgroundColor: record.color,
//               width: 20,
//               height: 20,
//               borderRadius: "50%",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               color: "#ffffff",
//               fontSize: "10px",
//               fontWeight: "bold",
//             }}
//           >
//             {getInitialsTitle(record.name)}
//           </div>
//           <Link to={"/classroom-profile"}>
//             <span>{text}</span>
//           </Link>
//         </Space>
//       ),
//     },
//     {
//       title: "Capacity",
//       dataIndex: "capacity",
//       key: "capacity",
//       align: "center",
//     },
//     {
//       title: "FTE",
//       dataIndex: "fte",
//       key: "fte",
//       align: "center",
//     },
//     {
//       title: "Students",
//       children: [
//         {
//           align: "center",
//           title: "Active",
//           dataIndex: "active",
//           key: "active",
//         },
//         {
//           align: "center",
//           title: "Upcoming",
//           dataIndex: "upcoming",
//           key: "upcoming",
//         },
//         {
//           align: "center",
//           title: "Present",
//           dataIndex: "present",
//           key: "present",
//         },
//       ],
//     },
//     {
//       title: "Staff",
//       children: [
//         {
//           align: "center",
//           title: "Assigned",
//           dataIndex: "assignedStaff",
//           key: "assignedStaff",
//         },
//         {
//           align: "center",
//           title: "Present",
//           dataIndex: "presentStaff",
//           key: "presentStaff",
//         },
//       ],
//     },
//     {
//       title: "Ratio",
//       children: [
//         {
//           title: "Current",
//           dataIndex: "status",
//           key: "status",
//           align: "center",
//           render: (status) => (
//             <Tag
//               icon={status === "warning" ? <FiThumbsDown /> : <FiThumbsUp />}
//               color={status === "warning" ? "error" : "success"}
//             />
//           ),
//         },
//         {
//           title: "Action",
//           key: "action",
//           align: "center",
//           render: (_, record) => (
//             <Dropdown
//               menu={{
//                 items: [
//                   { key: "edit", label: "Edit Classroom" },
//                   { key: "assign", label: "Assign Students" },
//                   { key: "manage", label: "Manage Staff" },
//                 ],
//                 onClick: ({ key }) => onActionClick(key, record),
//               }}
//               trigger={["click"]}
//             >
//               <IoIosMore className="pointer" />
//             </Dropdown>
//           ),
//         },
//       ],
//     },
//   ];

//   return (
//     <div className="card px-2 py-2">
//       <Select
//         value={selectedClassroom}
//         onChange={onClassroomSelect}
//         className="mb-4"
//         style={{ maxWidth: 185 }}
//         placeholder="Select Classroom"
//         options={uniqueClassrooms} // Use uniqueClassrooms for dropdown options
//       />
//       <TableComponent
//         columns={columns}
//         dataSource={filteredData}
//         pagination={pagination}
//       />
//     </div>
//   );
// }

// export default ClassroomOverviewTable;

import React, { useEffect, useState } from "react";
import {
  Select,
  Tag,
  Dropdown,
  Space,
  message,
  Avatar,
  Popconfirm,
  Form,
  Switch,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { IoIosMore } from "react-icons/io";
import TableComponent from "../../components/TableComponent";
import {
  generateClassroomData,
  generateClassroomDemoData,
  getInitialsTitle,
} from "../../services/common";
import { Link } from "react-router-dom";

import {
  useGetAllClassrooms,
  useUpdateClassroom,
} from "../../hooks/useClassroom";
import CommonModalComponent from "../../components/CommonModalComponent";
import CreateClassroom from "./CreateClassroom";
import DeletePopUp from "../../components/DeletePopUp";

function ClassroomOverviewTable() {
  const [selectedClassroom, setSelectedClassroom] = useState("all");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isCreateClassroomModalOpen, setCreateClassroomModalOpen] =
    useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [currentClassroomId, setCurrentClassroomId] = useState(null);
  // const [loading, setLoading] = useState(false);
  const {
    data: classroomData,
    isLoading,
    isError,
    error,
  } = useGetAllClassrooms();

  const { mutate: updateClassroom } = useUpdateClassroom();

  const handleDeleteModal = (id, name) => {
    setSelectedRecord({ id, name }); // Store the clicked item's id and name
    setDeleteModalOpen(true); // Open the delete modal
  };

  useEffect(() => {
    if (classroomData) {
      // Format data using generateClassroomData if needed
      const formattedClassroomData = generateClassroomData(classroomData.data);

      // Set formatted data or fallback to demo data for testing
      setData(formattedClassroomData || generateClassroomDemoData(15));
      setFilteredData(formattedClassroomData); // Initially show all classrooms
    }

    if (isError) {
      message.error("Failed to load classrooms. Please try again later.");
      console.error("Error fetching classrooms:", error);
    }
  }, [classroomData, isError, error]);
  // Fetch classroom data from the API
  // useEffect(() => {
  //   const fetchClassrooms = async () => {
  //     setLoading(true);
  //     try {
  //       // const classroomData = await ClassroomService.getAllClassrooms();
  //       // console.log("classroomData:", classroomData);?
  //       const formattedClassroomData = generateClassroomData(
  //         classroomData.data
  //       ); // Format data using generateClassroomData
  //       // console.log("formattedClassroomData:", generateClassroomDemoData(10));

  //       // API Data
  //       setData(formattedClassroomData || generateClassroomDemoData(15));
  //       setFilteredData(formattedClassroomData); // Initially show all classrooms

  //       // Demo Data for Testing
  //       // setData(generateClassroomDemoData(15));
  //       // setFilteredData(generateClassroomDemoData(15)); // Initially show all classrooms
  //     } catch (error) {
  //       message.error("Failed to load classrooms. Please try again later.");
  //       console.error("Error fetching classrooms:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchClassrooms();
  // }, []);

  // Handle classroom selection
  const onClassroomSelect = (value) => {
    setSelectedClassroom(value);

    if (value === "all") {
      setFilteredData(data); // Show all data
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
      console.log(action, record);
    }
  };

  const handleDelete = (classroomId) => {
    const formData = new FormData();
    formData.append("isDeleted", true);
    updateClassroom({ classroomId, classroomData: formData });
    console.log("Deleted classroom with ID:", classroomId);
    setDeleteModalOpen(false); // Close the modal after deletion
  };

  // Remove duplicate classrooms based on the `name`
  const uniqueClassrooms = [
    { value: "all", label: "All Classrooms" },
    ...Array.from(
      new Set(data.map((item) => item.name)) // Ensure uniqueness based on name
    )
      .map((name) => {
        return data.find((item) => item.name === name); // Find unique items based on the name
      })
      .map((item) => ({
        value: item.name,
        label: item.name,
      })),
  ];

  const columns = [
    {
      title: (
        <Select
          value={selectedClassroom}
          onChange={onClassroomSelect}
          className="select-classroom !text-start"
          placeholder="Select Classroom"
          options={uniqueClassrooms} // Use uniqueClassrooms for dropdown options
        />
      ),
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
          className: "name-column",
          render: (text, record) => (
            <Space>
              {record.color.startsWith("#") ? (
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
              <Link to={`/classroom-profile/${record.key}`}>
                <span>{text}</span>
              </Link>
            </Space>
          ),
        },
        {
          title: "Capacity",
          dataIndex: "capacity",
          key: "capacity",
          className: "name-column",
          align: "center",
        },
        {
          title: "FTE",
          dataIndex: "fte",
          key: "fte",
          className: "name-column",
          align: "center",
        },
      ],
    },

    {
      title: "Students",
      className: "students-column",
      children: [
        {
          title: "Active",
          dataIndex: "active",
          key: "active",
          align: "center",
          className: "students-column",
        },
        {
          align: "center",
          title: "Upcoming",
          dataIndex: "upcoming",
          key: "upcoming",
          className: "students-column",
        },
        {
          align: "center",
          title: "Present",
          dataIndex: "present",
          key: "present",
          className: "students-column",
        },
      ],
    },
    {
      title: "Staff",
      className: "staff-column",
      children: [
        {
          align: "center",
          title: "Assigned",
          dataIndex: "assignedStaff",
          key: "assignedStaff",
          className: "staff-column",
        },
        {
          align: "center",
          title: "Present",
          dataIndex: "presentStaff",
          key: "presentStaff",
          className: "staff-column",
        },
      ],
    },
    {
      title: "Ratio",
      className: "ratio-column",
      align: "center",
      children: [
        {
          title: "Current",
          dataIndex: "status",
          key: "status",
          align: "center",
          className: "ratio-column",
          render: (status) =>
            status === "warning" ? (
              <Avatar
                src="/classroom_icons/png/thumb_down.png"
                className="classroom-table-thumb"
              />
            ) : (
              <Avatar
                src="/classroom_icons/png/thumb_up.png"
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
          render: (_, record) => (
            <Dropdown
              menu={{
                items: [
                  { key: "edit", label: "Edit Classroom" },
                  {
                    key: "delete",
                    onClick: () => handleDeleteModal(record.key, record.name),
                    label:
                      // <Popconfirm
                      //   title="Delete the classroom"
                      //   description={
                      //     <>
                      //       Are you sure you want to delete classroom{" "}
                      //       <strong>{record.name}</strong>?
                      //     </>
                      //   }
                      //   icon={
                      //     <QuestionCircleOutlined style={{ color: "red" }} />
                      //   }
                      //   onConfirm={() => onActionClick("delete", record)}
                      //   okText="Yes"
                      //   cancelText="No"
                      // >
                      //   Delete Classroom
                      // </Popconfirm>
                      "Delete Classroom",
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
              trigger={["click"]}
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
        <div className="d-flex justify-content-end align-items-center mr50  mt5">
          <Form.Item
            name="active"
            valuePropName="checked"
            className="mb-0 me-2 classroom-show-inactive-toggle-btn"
          >
            <Switch />
          </Form.Item>
          <span className="classroom-inactive-label">Show Inactive</span>
        </div>
        <div className=" px-2 py-2 classroom-table">
          {/* <Select
          value={selectedClassroom}
          onChange={onClassroomSelect}
          className="mb-4"
          style={{ maxWidth: 185 }}
          placeholder="Select Classroom"
          options={uniqueClassrooms} // Use uniqueClassrooms for dropdown options
        /> */}
          <TableComponent
            columns={columns}
            dataSource={filteredData}
            loading={isLoading}
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
            closeModal={() => setCreateClassroomModalOpen(false)} // Passing the close function
          />
        </CommonModalComponent>
      )}
      {isDeleteModalOpen && (
        <CommonModalComponent
          open={isDeleteModalOpen}
          setOpen={setDeleteModalOpen}
          modalWidthSize={493}
          modalHeightSize={280}
          isClosable={true}
        >
          <DeletePopUp
            setCancel={setDeleteModalOpen}
            deleteData={selectedRecord}
            CardTitle="Delete Classroom"
            handleDelete={handleDelete} // Pass the updated handleDelete function
          />
        </CommonModalComponent>
      )}
    </>
  );
}

export default ClassroomOverviewTable;