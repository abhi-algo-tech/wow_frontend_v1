"use client";

import { Avatar, Card, Select, Table, Tooltip } from "antd";
import { CheckCircleFilled, WarningFilled } from "@ant-design/icons";
import { useState } from "react";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import CommonModalComponent from "../../components/CommonModalComponent";
import ShiftForm from "./ShiftForm";

const data = [
  {
    key: "1-Blue-D",
    name: "1-Blue-D",

    teachers: [
      {
        id: "1",
        name: "Ana Biwalkar",
        avatar: "/placeholder.svg",
        duration: {
          first: 45,
          second: 55,
        },
        schedule: [
          { day: "mon", time: "07:00 AM - 12:00 PM", status: "published" },
          { day: "tue", time: "07:00 AM - 05:00 PM", status: "unpublised" },
          { day: "wed", time: "", status: "published" },
          { day: "thu", time: "07:00 AM - 05:00 PM", status: "published" },
          { day: "fri", time: "07:00 AM - 05:00 PM", status: "published" },
        ],
      },
      {
        id: "2",
        name: "Lana Rhodes",
        avatar: "/placeholder.svg",
        duration: {
          first: 55,
          second: 45,
        },
        schedule: [
          { day: "mon", time: "02:00 AM - 05:00 PM", status: "published" },
          { day: "tue", time: "07:00 AM - 05:00 PM", status: "unpublised" },
          { day: "wed", time: "", status: "published" },
          { day: "thu", time: "07:00 AM - 05:00 PM", status: "published" },
          { day: "fri", time: "07:00 AM - 05:00 PM", status: "published" },
        ],
      },
    ],
    schedule: {
      mon: false,
      tue: true,
      wed: false,
      thu: true,
      fri: true,
    },
  },
  {
    key: "2-Yellow-C",
    name: "2-Yellow-C",

    teachers: [
      {
        id: "3",
        name: "Chaitanya Desai",
        avatar: "/placeholder.svg",
        duration: {
          first: 45,
          second: 55,
        },
        schedule: [
          { day: "mon", time: "07:00 AM - 05:00 PM", status: "published" },
          { day: "tue", time: "07:00 AM - 05:00 PM", status: "unpublised" },
          { day: "wed", time: "", status: "published" },
          { day: "thu", time: "07:00 AM - 05:00 PM", status: "published" },
          { day: "fri", time: "07:00 AM - 05:00 PM", status: "published" },
        ],
      },
      {
        id: "4",
        name: "Spandana Shah",
        avatar: "/placeholder.svg",
        duration: {
          first: 45,
          second: 55,
        },
        schedule: [
          { day: "mon", time: "07:00 AM - 05:00 PM", status: "published" },
          { day: "tue", time: "07:00 AM - 05:00 PM", status: "unpublised" },
          { day: "wed", time: "", status: "published" },
          { day: "thu", time: "07:00 AM - 05:00 PM", status: "published" },
          { day: "fri", time: "07:00 AM - 05:00 PM", status: "published" },
        ],
      },
    ],
    schedule: {
      mon: true,
      tue: false,
      wed: true,
      thu: true,
      fri: false,
    },
  },
];
export default function ScheduleTable({ startDate }) {
  const [expandedRows, setExpandedRows] = useState([]);
  const [isAddShiftModalOpen, setAddShiftModalOpen] = useState(false);

  const TeacherSchedule = ({ record }) => (
    <div className="child-table">
      <table className="w-full table-auto border-collapse">
        <tbody>
          {record.teachers.map((teacher) => (
            <tr key={teacher.id} className="px-1 py-1">
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
                        <Avatar
                          size={20}
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
              {teacher.schedule.map((slot, index) => (
                <td
                  key={index}
                  className={`border p-2 text-xs text-center  ${
                    slot.status ? "bg-blue-50" : "bg-gray-50"
                  }`}
                  style={{ width: "16%" }}
                >
                  {slot.time && (
                    <div
                      className={`${
                        slot.status === "published"
                          ? "teacher-schedule-time-card"
                          : "teacher-unpublished-time-card"
                      }`}
                    >
                      <span className="label-12-500">{slot.time}</span>
                    </div>
                  )}
                  {!slot.time && (
                    <div
                      className="pointer"
                      onClick={() => setAddShiftModalOpen(true)}
                    >
                      <Avatar src={"/wow_icons/png/add.png"} size={24} />
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
            <div className="label-10-400">07:30 AM-08:00 AM </div>
            <div className="scheduling-tag-status">
              <span className="label-10-400 text-white">Under ratio</span>
            </div>
          </div>
          <div className="d-flex justify-content-between mb6 align-items-center gap-2">
            <div className="label-10-400">07:30 AM-08:00 AM </div>
            <div className="scheduling-tag-status">
              <span className="label-10-400 text-white">Under ratio</span>
            </div>
          </div>
          <div className="d-flex justify-content-between mb6 align-items-center gap-2">
            <div className="label-10-400">07:30 AM-08:00 AM </div>
            <div className="scheduling-tag-status">
              <span className="label-10-400 text-white">Under ratio</span>
            </div>
          </div>
        </div>
        <div className="text-end">
          <span className="label-10-500 pointer">Show More</span>
        </div>
      </>
    );
  };
  // const columns = [
  //   {
  //     title: expandedRows.length > 0 ? "Collapse All" : "Expand All",
  //     dataIndex: "name",
  //     key: "name",
  //     width: "20%",

  //     align: "start",
  //     className: "label-14-600 pointer",
  //     render: (text, record) => {
  //       const isExpanded = expandedRows.includes(record.key);
  //       return (
  //         <div
  //           className="d-flex align-items-center gap12 pointer"
  //           onClick={() =>
  //             setExpandedRows((prevExpanded) =>
  //               prevExpanded.includes(record.key)
  //                 ? prevExpanded.filter((key) => key !== record.key)
  //                 : [...prevExpanded, record.key]
  //             )
  //           }
  //         >
  //           <span>{text}</span>
  //           {isExpanded ? (
  //             <MdOutlineExpandLess className="text-lg text-gray-500" />
  //           ) : (
  //             <MdOutlineExpandMore className="text-lg text-gray-500" />
  //           )}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     title: "Mon 27",
  //     dataIndex: ["schedule", "mon"],
  //     key: "mon",
  //     align: "center",
  //     width: "16%",
  //     className: "label-14-600",
  //     render: (value) =>
  //       value ? (
  //         <Avatar src={"/wow_icons/png/check_circle.png"} size={28} />
  //       ) : (
  //         <img src={"/wow_icons/png/Alert_triangle.png"} className="size-28" />
  //       ),
  //   },
  //   {
  //     title: "Tue 28",
  //     dataIndex: ["schedule", "tue"],
  //     key: "tue",
  //     align: "center",
  //     width: "16%",
  //     className: "label-14-600",
  //     render: (value) =>
  //       value ? (
  //         <Avatar src={"/wow_icons/png/check_circle.png"} size={28} />
  //       ) : (
  //         <img src={"/wow_icons/png/Alert_triangle.png"} className="size-28" />
  //       ),
  //   },
  //   {
  //     title: "Wed 29",
  //     dataIndex: ["schedule", "wed"],
  //     key: "wed",
  //     align: "center",
  //     width: "16%",
  //     className: "label-14-600",
  //     render: (value) =>
  //       value ? (
  //         <Avatar src={"/wow_icons/png/check_circle.png"} size={28} />
  //       ) : (
  //         <img src={"/wow_icons/png/Alert_triangle.png"} className="size-28" />
  //       ),
  //   },
  //   {
  //     title: "Thu 30",
  //     dataIndex: ["schedule", "thu"],
  //     key: "thu",
  //     align: "center",
  //     width: "16%",
  //     className: "label-14-600",
  //     render: (value) =>
  //       value ? (
  //         <Avatar src={"/wow_icons/png/check_circle.png"} size={28} />
  //       ) : (
  //         <img src={"/wow_icons/png/Alert_triangle.png"} className="size-28" />
  //       ),
  //   },
  //   {
  //     title: "Fri 31",
  //     dataIndex: ["schedule", "fri"],
  //     key: "fri",
  //     align: "center",
  //     width: "16%",
  //     className: "label-14-600",
  //     render: (value) =>
  //       value ? (
  //         <Avatar src={"/wow_icons/png/check_circle.png"} size={28} />
  //       ) : (
  //         <img src={"/wow_icons/png/Alert_triangle.png"} className="size-28" />
  //       ),
  //   },
  // ];
  // Generate column titles dynamically
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
            />
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
              <img className="size-15" src={"wow_icons/png/more_time.png"} />
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
        <CommonModalComponent
          open={isAddShiftModalOpen}
          setOpen={setAddShiftModalOpen}
          modalWidthSize={796}
          modalHeightSize={544}
          isClosable={true}
        >
          <ShiftForm
            cardTitle={"Add Shift"}
            classroomId={null}
            setCloseModal={setAddShiftModalOpen(false)}
          />
          {/* <CreateStudent
            CardTitle={"Add Student"}
            classroomId={null}
            closeModal={() => setAddShiftModalOpen(false)}
          /> */}
        </CommonModalComponent>
      )}
    </>
  );
}
