import { Avatar, Card, Select, Table, Tooltip } from "antd";
import { CheckCircleFilled, WarningFilled } from "@ant-design/icons";
import { useState } from "react";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import CommonModalComponent from "../../components/CommonModalComponent";
import ShiftForm from "./ShiftForm";
import { Link } from "react-router-dom";
import DeleteSchedulePopUp from "../../components/DeleteSchedulePopup";
import DeleteShift from "./DeleteShift";
import { getDateForDay, reStructureScheduleArray } from "./scheduleData";
const images = [
  "/classroom_icons/png/Aadhira.png",
  "/classroom_icons/png/Aarav.png",
  "/classroom_icons/png/Aarjav.png",
];
// const data = [
//   {
//     key: 1,
//     name: "1-Blue-D",

//     teachers: [
//       {
//         id: "1",
//         name: "Ana Biwalkar",
//         avatar: "/classroom_icons/png/Aadhira.png",
//         duration: {
//           first: 45,
//           second: 55,
//         },
//         schedule: [],
//       },
//       {
//         id: "2",
//         name: "Lana Rhodes",
//         avatar: "/classroom_icons/png/Aarav.png",
//         duration: {
//           first: 55,
//           second: 45,
//         },
//         schedule: [
//           {
//             id: 1,
//             day: "mon",
//             time: "02:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 2,
//             day: "tue",
//             time: "07:00 AM - 05:00 PM",
//             status: "unpublised",
//           },
//           { id: 3, day: "wed", time: "", status: "" },
//           {
//             id: 4,
//             day: "thu",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 5,
//             day: "fri",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//         ],
//       },
//     ],
//     schedule: {
//       mon: false,
//       tue: true,
//       wed: false,
//       thu: true,
//       fri: true,
//     },
//   },
//   {
//     key: 2,
//     name: "2-Yellow-C",

//     teachers: [
//       {
//         id: "3",
//         name: "Chaitanya Desai",
//         avatar: "/classroom_icons/png/Aadhira.png",
//         duration: {
//           first: 45,
//           second: 55,
//         },
//         schedule: [
//           {
//             id: 1,
//             day: "mon",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 2,
//             day: "tue",
//             time: "07:00 AM - 05:00 PM",
//             status: "unpublised",
//           },
//           { id: 3, day: "wed", time: "", status: "published" },
//           {
//             id: 4,
//             day: "thu",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 5,
//             day: "fri",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//         ],
//       },
//       {
//         id: "4",
//         name: "Spandana Shah",
//         avatar: "/classroom_icons/png/Aadhira.png",
//         duration: {
//           first: 45,
//           second: 55,
//         },
//         schedule: [
//           {
//             id: 1,
//             day: "mon",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 2,
//             day: "tue",
//             time: "07:00 AM - 05:00 PM",
//             status: "unpublised",
//           },
//           { id: 3, day: "wed", time: "", status: "published" },
//           {
//             id: 4,
//             day: "thu",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 5,
//             day: "fri",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//         ],
//       },
//     ],
//     schedule: {
//       mon: true,
//       tue: false,
//       wed: true,
//       thu: true,
//       fri: false,
//     },
//   },
//   {
//     key: 3,
//     name: "2-Purple",

//     teachers: [
//       {
//         id: "3",
//         name: "Chaitanya Desai",
//         avatar: "/classroom_icons/png/Aadhira.png",
//         duration: {
//           first: 45,
//           second: 55,
//         },
//         schedule: [
//           {
//             id: 1,
//             day: "mon",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 2,
//             day: "tue",
//             time: "07:00 AM - 05:00 PM",
//             status: "unpublised",
//           },
//           { id: 3, day: "wed", time: "", status: "published" },
//           {
//             id: 4,
//             day: "thu",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 5,
//             day: "fri",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//         ],
//       },
//       {
//         id: "4",
//         name: "Spandana Shah",
//         avatar: "/classroom_icons/png/Aarav.png",
//         duration: {
//           first: 45,
//           second: 55,
//         },
//         schedule: [
//           {
//             id: 1,
//             day: "mon",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 2,
//             day: "tue",
//             time: "07:00 AM - 05:00 PM",
//             status: "unpublised",
//           },
//           { id: 3, day: "wed", time: "", status: "published" },
//           {
//             id: 4,
//             day: "thu",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 5,
//             day: "fri",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//         ],
//       },
//     ],
//     schedule: {
//       mon: true,
//       tue: false,
//       wed: true,
//       thu: true,
//       fri: false,
//     },
//   },
//   {
//     key: 4,
//     name: "R-Yellow",

//     teachers: [
//       {
//         id: "3",
//         name: "Chaitanya Desai",
//         avatar: "/classroom_icons/png/Aarav.png",
//         duration: {
//           first: 45,
//           second: 55,
//         },
//         schedule: [
//           {
//             id: 1,
//             day: "mon",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 2,
//             day: "tue",
//             time: "07:00 AM - 05:00 PM",
//             status: "unpublised",
//           },
//           { id: 3, day: "wed", time: "", status: "published" },
//           {
//             id: 4,
//             day: "thu",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 5,
//             day: "fri",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//         ],
//       },
//       {
//         id: "4",
//         name: "Spandana Shah",
//         avatar: "/classroom_icons/png/Aarav.png",
//         duration: {
//           first: 45,
//           second: 55,
//         },
//         schedule: [
//           {
//             id: 1,
//             day: "mon",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 2,
//             day: "tue",
//             time: "07:00 AM - 05:00 PM",
//             status: "unpublised",
//           },
//           { id: 3, day: "wed", time: "", status: "published" },
//           {
//             id: 4,
//             day: "thu",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 5,
//             day: "fri",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//         ],
//       },
//     ],
//     schedule: {
//       mon: true,
//       tue: false,
//       wed: true,
//       thu: true,
//       fri: false,
//     },
//   },
//   {
//     key: 5,
//     name: "6-Yellow-C",

//     teachers: [
//       {
//         id: "3",
//         name: "Chaitanya Desai",
//         avatar: "/classroom_icons/png/Aarav.png",
//         duration: {
//           first: 45,
//           second: 55,
//         },
//         schedule: [
//           {
//             id: 1,
//             day: "mon",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 2,
//             day: "tue",
//             time: "07:00 AM - 05:00 PM",
//             status: "unpublised",
//           },
//           { id: 3, day: "wed", time: "", status: "published" },
//           {
//             id: 4,
//             day: "thu",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 5,
//             day: "fri",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//         ],
//       },
//       {
//         id: "4",
//         name: "Spandana Shah",
//         avatar: "/classroom_icons/png/Aarav.png",
//         duration: {
//           first: 45,
//           second: 55,
//         },
//         schedule: [
//           {
//             id: 1,
//             day: "mon",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 2,
//             day: "tue",
//             time: "07:00 AM - 05:00 PM",
//             status: "unpublised",
//           },
//           { id: 3, day: "wed", time: "", status: "published" },
//           {
//             id: 4,
//             day: "thu",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 5,
//             day: "fri",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//         ],
//       },
//     ],
//     schedule: {
//       mon: true,
//       tue: false,
//       wed: true,
//       thu: true,
//       fri: false,
//     },
//   },
//   {
//     key: 6,
//     name: "2-Red-C",

//     teachers: [
//       {
//         id: "3",
//         name: "Chaitanya Desai",
//         avatar: "/classroom_icons/png/Aarav.png",
//         duration: {
//           first: 45,
//           second: 55,
//         },
//         schedule: [
//           {
//             id: 1,
//             day: "mon",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 2,
//             day: "tue",
//             time: "07:00 AM - 05:00 PM",
//             status: "unpublised",
//           },
//           { id: 3, day: "wed", time: "", status: "published" },
//           {
//             id: 4,
//             day: "thu",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 5,
//             day: "fri",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//         ],
//       },
//       {
//         id: "4",
//         name: "Spandana Shah",
//         avatar: "/classroom_icons/png/Aarav.png",
//         duration: {
//           first: 45,
//           second: 55,
//         },
//         schedule: [
//           {
//             id: 1,
//             day: "mon",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 2,
//             day: "tue",
//             time: "07:00 AM - 05:00 PM",
//             status: "unpublised",
//           },
//           { id: 3, day: "wed", time: "", status: "published" },
//           {
//             id: 4,
//             day: "thu",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//           {
//             id: 5,
//             day: "fri",
//             time: "07:00 AM - 05:00 PM",
//             status: "published",
//           },
//         ],
//       },
//     ],
//     schedule: {
//       mon: true,
//       tue: false,
//       wed: true,
//       thu: true,
//       fri: false,
//     },
//   },
// ];
export default function ScheduleTable({
  startDate,
  classRoomList = [],
  scheduleData = [],
  dateRange = {},
}) {
  const [expandedRows, setExpandedRows] = useState([]);
  const [isAddShiftModalOpen, setAddShiftModalOpen] = useState(false);
  const [isEditShiftModalOpen, setEditShiftModalOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isConfirmDeleteShiftModalOpen, setConfirmDeleteShiftModalOpen] =
    useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});
  const data = reStructureScheduleArray(scheduleData);
  // console.log("data", data);

  const handleDeleteConfirmModal = (id, name) => {
    setSelectedRecord({ id, name });
    setEditShiftModalOpen(false);
    setConfirmDeleteShiftModalOpen(true);
  };
  const handleDeleteBtnConfirmModal = (id, name) => {
    setSelectedRecord({ id, name });
    setEditShiftModalOpen(false);
    setDeleteModalOpen(true);
  };
  const handleCreateShiftModal = (selectedData) => {
    setSelectedRecord(selectedData);
    setAddShiftModalOpen(true);
  };
  const handleEditShiftModal = (selectedData) => {
    setSelectedRecord(selectedData);
    setEditShiftModalOpen(true);
  };

  const handleDelete = async (id) => {};
  const TeacherSchedule = ({ record }) => (
    <div className="child-table">
      <table className="w-full table-auto border-collapse">
        <tbody>
          {record.teachers.map((teacher, teacherIndex) => (
            <tr key={`${record.name}-${teacherIndex}`} className="px-1 py-1">
              {/* Teacher Name */}
              <td className="border p-2" style={{ width: "20%" }}>
                <div className="d-flex justify-content-between align-items-center gap12">
                  <div>
                    <Avatar src={teacher.avatar} alt={teacher.name} size={24} />
                  </div>
                  <div className="teacher-name-container">
                    <div className="font-medium">{teacher.name}</div>
                    <div className="teacher-time-container">
                      <div className="teacher-toggle-history">
                        <Avatar
                          size={20}
                          src={"/wow_icons/png/history_toggle_off.png"}
                        />
                        <div className="label-12-500 mr8">
                          {teacher?.duration?.first}h
                        </div>
                      </div>
                      <div className="teacher-more-time">
                        <img
                          className="width20 height18"
                          src={"/wow_icons/png/more_time.png"}
                        />
                        <div className="label-12-500 mr8">
                          {teacher?.duration?.first}h
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              {/* Schedule for each day */}
              {teacher.schedule.map((slot, slotIndex) => (
                <td
                  key={`${record.name}-${teacherIndex}-${slotIndex}`} // Unique key using record.name, teacherIndex, and slotIndex
                  className={`border p-2 text-xs text-center ${
                    slot.status ? "bg-blue-50" : "bg-gray-50"
                  }`}
                  style={{ width: "16%" }}
                  onMouseEnter={() =>
                    !slot.time &&
                    setHoverIndex({
                      recordName: record.name,
                      teacherIndex,
                      slotIndex,
                    })
                  }
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {slot.time && (
                    <div
                      className={`${
                        slot.status === "published"
                          ? "teacher-schedule-time-card"
                          : "teacher-unpublished-time-card"
                      } pointer`}
                      onClick={() =>
                        handleEditShiftModal({
                          teacherId: teacher?.id,
                          teacherName: teacher?.name,
                          classRoomId: record?.key,
                          classRoomName: record?.name,
                          dayName: slot?.day,
                          date: getDateForDay(dateRange, slot?.day),
                          startTime: slot?.startTime,
                          endTime: slot?.endTime,
                          breakStartTime: slot?.breakStartTime,
                          breakEndTime: slot?.breakEndTime,
                        })
                      }
                    >
                      <span className="label-12-500">{slot.time}</span>
                    </div>
                  )}
                  {!slot.time &&
                    hoverIndex?.recordName === record.name &&
                    hoverIndex?.teacherIndex === teacherIndex &&
                    hoverIndex?.slotIndex === slotIndex && (
                      <div
                        className="pointer"
                        onClick={() =>
                          handleCreateShiftModal({
                            teacherId: teacher?.id,
                            teacherName: teacher?.name,
                            classRoomId: record?.key,
                            classRoomName: record?.name,
                            dayName: slot?.day,
                            date: getDateForDay(dateRange, slot?.day),
                          })
                        }
                      >
                        <Avatar src={"/wow_icons/png/add.png"} size={13} />
                      </div>
                    )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  const getTooltipContent = (day, schoolName) => {
    return (
      <>
        <div
          style={{
            padding: "6px",
          }}
          className="gap6"
        >
          <div className="d-flex justify-content-between mb6 align-items-center gap-2">
            <div className="label-14-600">{day}</div>
            <div className="">
              <span className="label-14-600">{schoolName}</span>
            </div>
          </div>
          <div className="d-flex justify-content-between mb6 align-items-center gap-2">
            <div className="label-10-400">12:30 AM-01:00 PM </div>
            <div className="scheduling-tag-status">
              <span className="label-10-400 text-white">Under ratio</span>
            </div>
          </div>
          <div className="d-flex justify-content-between mb6 align-items-center gap-2">
            <div className="label-10-400">02:30 AM-03:00 PM </div>
            <div className="scheduling-tag-status">
              <span className="label-10-400 text-white">Under ratio</span>
            </div>
          </div>
          <div className="d-flex justify-content-between mb6 align-items-center gap-2">
            <div className="label-10-400">05:00 AM-05:30 AM </div>
            <div className="scheduling-tag-status">
              <span className="label-10-400 text-white">Under ratio</span>
            </div>
          </div>
        </div>
        <div className="text-end">
          <Link to={"/schedule/classroomview"}>
            <span className="label-10-500 pointer">Show More</span>
          </Link>
        </div>
      </>
    );
  };

  const generateColumns = () => {
    const weekDays = Array.from(
      { length: 5 },
      (_, i) => startDate.add(i, "day").format("ddd DD MMM") // Get day and date
    );
    // console.log("weekDays", weekDays);

    return [
      {
        title: expandedRows.length > 0 ? "Collapse All" : "Expand All",
        dataIndex: "name",
        key: "name",
        width: "20%",
        align: "start",
        className: "label-14-600 pointer",
        render: (text, record) => {
          const isExpanded = expandedRows.includes(record.key);
          return (
            <div
              className="d-flex align-items-center gap12 pointer"
              onClick={() =>
                setExpandedRows((prevExpanded) =>
                  prevExpanded.includes(record.key)
                    ? prevExpanded.filter((key) => key !== record.key)
                    : [...prevExpanded, record.key]
                )
              }
            >
              <span>{text}</span>
              {isExpanded ? (
                <MdOutlineExpandLess className="text-lg text-gray-500" />
              ) : (
                <MdOutlineExpandMore className="text-lg text-gray-500" />
              )}
            </div>
          );
        },
      },
      ...weekDays.map((day, index) => ({
        title: day.split(" ").slice(0, 2).join(" "),
        dataIndex: ["schedule", ["mon", "tue", "wed", "thu", "fri"][index]],
        key: index,
        align: "center",
        width: "16%",
        className: "label-14-600",
        render: (value, data) =>
          value ? (
            <Avatar src={"/wow_icons/png/check_circle.png"} size={28} />
          ) : (
            <Tooltip
              color="#fff"
              key={day}
              overlayStyle={{
                borderRadius: 8,
                border: "1px solid rgba(22, 40, 49, 0.10)",
                background: "#FFF",
                width: 208,
                gap: 6,
                alignItems: "flex-start",
              }}
              title={getTooltipContent(day, data.name)}
              className="no-border-tag pointer"
            >
              <img
                src={"/wow_icons/png/Alert_triangle.png"}
                className="size-28"
              />
            </Tooltip>
          ),
      })),
    ];
  };
  return (
    <>
      <Card styles={{ body: { padding: 16 } }}>
        {/* <WeekDatePicker /> */}
        <div className="d-flex align-items-center justify-content-between mb16">
          <div className="mb-6">
            <Select
              className="select-student-add-from"
              placeholder="Select Classroom"
              style={{ width: 185 }}
            >
              {classRoomList?.map((classroom) => (
                <Select.Option key={classroom.id} value={classroom.id}>
                  {classroom.name}
                </Select.Option>
              ))}
            </Select>
            {/* <Select
              placeholder="Select Classroom"
              style={{
                width: 185,
                height: 40,
                borderRadius: 8,
                background: "rgba(177, 175, 233, 0.1)",
                border: "none",
              }}
              options={[
                { value: "1-Blue-D", label: "1-Blue-D" },
                { value: "2-Green-D", label: "2-Green-D" },
                { value: "3-Purple-D", label: "3-Purple-D" },
              ]}
            /> */}
          </div>
          <div className="d-flex align-items-center gap16 mb6 text-sm">
            <div className="d-flex align-items-center gap10">
              <img
                className="size-15"
                src={"wow_icons/png/history_toggle_off.png"}
              />
              <span className="label-12-500">Available</span>
            </div>

            <div className="d-flex align-items-center gap10">
              <img
                className="width15 height13"
                src={"wow_icons/png/more_time.png"}
              />
              <span className="label-12-500">Scheduled</span>
            </div>

            <div className="d-flex align-items-center gap10">
              <div className="not-published-line" />
              <span className="label-12-500">Not Published</span>
            </div>

            <div className="d-flex align-items-center gap10">
              <div className="published-line" />
              <span className="label-12-500">Published</span>
            </div>
            <div className="d-flex align-items-center gap10">
              <img
                className="size-15"
                src={"wow_icons/png/Alert_triangle.png"}
              />
              <span className="label-12-500">Under Ratio</span>
            </div>
            <div className="d-flex align-items-center gap10">
              <img className="size-15" src={"wow_icons/png/check_circle.png"} />
              <span className="label-12-500">In Ratio</span>
            </div>
          </div>
        </div>
        <Table
          columns={generateColumns()}
          dataSource={data}
          pagination={false}
          bordered
          size="large"
          className="[&_.ant-table-cell]:!p-4 schedule-custom-table"
          expandable={{
            expandedRowRender: (record) => <TeacherSchedule record={record} />,
            expandedRowKeys: expandedRows,
            onExpand: (expanded, record) => {
              if (expanded) {
                setExpandedRows([...expandedRows, record.key]);
              } else {
                setExpandedRows(
                  expandedRows.filter((key) => key !== record.key)
                );
              }
            },
            expandIconColumnIndex: -1,
            expandIcon: () => null,
          }}
        />
      </Card>

      {isAddShiftModalOpen && (
        <ShiftForm
          cardTitle={"Add Shift"}
          classroomSelectedData={selectedRecord}
          setCloseModal={setAddShiftModalOpen}
        />
      )}
      {isEditShiftModalOpen && (
        <ShiftForm
          cardTitle={"Edit Shift"}
          classroomSelectedData={selectedRecord}
          setCloseModal={setEditShiftModalOpen}
          handleDeleteConfirmModal={handleDeleteConfirmModal}
        />
      )}

      {isDeleteModalOpen && (
        <CommonModalComponent
          open={isDeleteModalOpen}
          setOpen={setDeleteModalOpen}
          modalWidthSize={560}
          isClosable={true}
        >
          <DeleteSchedulePopUp
            setCancel={setDeleteModalOpen}
            deleteData={selectedRecord}
            // CardTitle="Delete Classroom"
            handleDelete={handleDelete}
            module="Selected Shift"
          />
        </CommonModalComponent>
      )}
      {isConfirmDeleteShiftModalOpen && (
        <CommonModalComponent
          open={isConfirmDeleteShiftModalOpen}
          setOpen={setConfirmDeleteShiftModalOpen}
          modalWidthSize={531}
          modalHeightSize={371}
          isClosable={true}
        >
          <DeleteShift
            setCancel={setConfirmDeleteShiftModalOpen}
            deleteData={selectedRecord}
            CardTitle="Delete Shift"
            handleDelete={handleDelete}
            module="Selected Shift"
            handleBack={() => handleEditShiftModal(selectedRecord)}
            handleDeleteBtnConfirmModal={handleDeleteBtnConfirmModal}
          />
        </CommonModalComponent>
      )}
    </>
  );
}
