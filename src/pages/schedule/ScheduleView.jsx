"use client";

import React from "react";
import { Collapse, Progress, Space, Avatar, Card } from "antd";
import { UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { getInitialsTitleWithColor } from "../../services/common";
import CardGrid from "../../components/card/CardGrid";
import { useGetAllSchedulesByClassroom } from "../../hooks/useSchedule";

// function transformScheduleData(scheduleData) {
//   // Helper function to format time from "HH:MM:SS" to "h:mm A"
//   function formatTime(time) {
//     const [hour, minute] = time.split(":").map(Number);
//     const ampm = hour >= 12 ? "PM" : "AM";
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
//   }

//   // Transform schedule data
//   return scheduleData?.data?.map((classroom) => ({
//     id: classroom.classroomId.toString(),
//     name: classroom.classroomName,
//     expectedStudents: classroom.assignedClassroomStudentCount,
//     requiredStaff: classroom.staffRatio,
//     scheduledStaff: classroom.staffs.length,
//     type: "class",
//     scheduling: classroom.ratioStatus.scheduleMismatches.map((mismatch) => ({
//       timeRange: `${formatTime(
//         mismatch.timeRange.split(" - ")[0]
//       )} - ${formatTime(mismatch.timeRange.split(" - ")[1])}`,
//       typeOf: mismatch.message.toLowerCase().includes("mismatch")
//         ? "underRatio"
//         : "inRatio",
//     })),
//     staff: classroom.staffs.map((staff) => ({
//       id: staff.staffId.toString(),
//       name: staff.staffName,
//       duration: {
//         scheduled: staff.scheduledHours,
//         available: staff.availableHours,
//       },
//       type: "staff",
//       avatar: `/classroom_icons/png/${staff.staffName.replace(" ", "_")}.png`,
//       scheduling: staff.schedules.flatMap((schedule) => [
//         {
//           timeRange: `${formatTime(schedule.startShift)} - ${formatTime(
//             schedule.endShift
//           )}`,
//           typeOf: "inRatio",
//         },
//         {
//           timeRange: `${formatTime(schedule.breakShift)} - ${formatTime(
//             schedule.breakEndShift
//           )}`,
//           typeOf: "underRatio",
//         },
//       ]),
//     })),
//   }));
// }

function transformScheduleData(scheduleData) {
  // Helper function to format time from "HH:MM:SS" to "h:mm A"
  function formatTime(time) {
    const [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  }

  // Helper function to check if a time is within a range
  function isTimeWithinRange(time, rangeStart, rangeEnd) {
    return time >= rangeStart && time <= rangeEnd;
  }

  // Function to calculate scheduling status
  function calculateScheduling(classroom) {
    const {
      ratioStartTime,
      ratioEndTime,
      staffRatio,
      assignedClassroomStudentCount,
      staffs,
    } = classroom;

    // Calculate required staff based on the ratio
    const requiredStaff = Math.ceil(assignedClassroomStudentCount / staffRatio);

    // Helper to parse time (HH:MM:SS) into minutes from midnight
    function parseTimeToMinutes(time) {
      const [hour, minute] = time.split(":").map(Number);
      return hour * 60 + minute;
    }

    // Helper to format time back to HH:MM AM/PM
    function formatTime(minutes) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
    }

    // Helper to check if a time range overlaps
    function isTimeWithinRange(time, start, end) {
      const timeMinutes = parseTimeToMinutes(time);
      const startMinutes = parseTimeToMinutes(start);
      const endMinutes = parseTimeToMinutes(end);
      return timeMinutes >= startMinutes && timeMinutes < endMinutes;
    }

    const ratioStartMinutes = parseTimeToMinutes(ratioStartTime);
    const ratioEndMinutes = parseTimeToMinutes(ratioEndTime);

    const timeSlots = [];
    let currentMinutes = ratioStartMinutes;

    // Loop through time slots in 30-minute intervals
    while (currentMinutes < ratioEndMinutes) {
      const nextMinutes = currentMinutes + 30;

      // Calculate the number of staff covering this time slot
      const staffCount = staffs.filter((staff) =>
        staff.schedules.some((schedule) =>
          isTimeWithinRange(
            formatTime(currentMinutes),
            schedule.startShift,
            schedule.endShift
          )
        )
      ).length;

      // Determine the type of the time range
      const typeOf =
        staffCount >= requiredStaff
          ? "inRatio"
          : staffCount === 0
          ? "underRatio"
          : "overRatio";

      // Add the time slot to the list
      timeSlots.push({
        timeRange: `${formatTime(currentMinutes)} - ${formatTime(nextMinutes)}`,
        typeOf,
      });

      currentMinutes = nextMinutes;
    }

    return timeSlots;
  }

  // Transform schedule data
  return scheduleData?.data?.map((classroom) => ({
    id: classroom.classroomId.toString(),
    name: classroom.classroomName,
    expectedStudents: classroom.assignedClassroomStudentCount,
    requiredStaff: Math.ceil(
      classroom.assignedClassroomStudentCount / classroom.staffRatio
    ),
    scheduledStaff: classroom.staffs.length,
    type: "class",
    scheduling: calculateScheduling(classroom),
    staff: classroom.staffs.map((staff) => ({
      id: staff.staffId.toString(),
      avatar: classroom.profileUrl,
      name: staff.staffName,
      duration: {
        scheduled: staff.scheduledHours,
        available: staff.availableHours,
      },
      type: "staff",
      scheduling: staff.schedules.flatMap((schedule) => [
        {
          timeRange: `${formatTime(schedule.startShift)} - ${formatTime(
            schedule.endShift
          )}`,
          typeOf: "inRatio",
        },
        {
          timeRange: `${formatTime(schedule.breakShift)} - ${formatTime(
            schedule.breakEndShift
          )}`,
          typeOf: "underRatio",
        },
      ]),
    })),
  }));
}

export default function ScheduleView({ classroomId, date }) {
  const images = [
    "/classroom_icons/png/Aadhira.png",
    "/classroom_icons/png/Aarav.png",
    "/classroom_icons/png/Aarjav.png",
  ];
  const { data: scheduleData } = useGetAllSchedulesByClassroom(
    classroomId,
    date
  );

  const schedulingData = transformScheduleData(scheduleData);
  console.log("schedulingData:", schedulingData);
  // const schedulingData = [
  //   {
  //     id: "1",
  //     name: "1-Blue-D",
  //     expectedStudents: 12,
  //     requiredStaff: 3,
  //     scheduledStaff: 2,
  //     type: "class",
  //     scheduling: [
  //       { timeRange: "8:00 AM - 1:00 PM", typeOf: "inRatio" },
  //       { timeRange: "1:00 PM - 3:00 PM", typeOf: "underRatio" },
  //       { timeRange: "3:00 PM - 5:00 PM", typeOf: "inRatio" },
  //       { timeRange: "5:00 PM - 5:30 PM", typeOf: "overRatio" },
  //     ],
  //     staff: [
  //       {
  //         id: 1,
  //         name: "Jessica Rhodes",
  //         duration: { scheduled: 55, available: 43 },
  //         type: "staff",
  //         avatar: "/classroom_icons/png/Aadhira.png",
  //         scheduling: [
  //           { timeRange: "9:00 AM - 1:00 PM", typeOf: "inRatio" },
  //           { timeRange: "1:00 PM - 1:30 PM", typeOf: "underRatio" },
  //           { timeRange: "1:30 PM - 2:00 PM", typeOf: "inRatio" },
  //         ],
  //       },
  //       {
  //         id: 2,
  //         name: "Ana Biwalkar",
  //         duration: { scheduled: 55, available: 43 },
  //         type: "staff",
  //         avatar: "/classroom_icons/png/Aarav.png",
  //         scheduling: [
  //           { timeRange: "11:00 AM - 1:00 PM", typeOf: "inRatio" },
  //           { timeRange: "1:00 PM - 2:30 PM", typeOf: "underRatio" },
  //           { timeRange: "2:30 PM - 5:00 PM", typeOf: "inRatio" },
  //         ],
  //       },
  //     ],
  //   },
  //   // {
  //   //   id: "2",
  //   //   name: "1-Pink-D",
  //   //   expectedStudents: 12,
  //   //   requiredStaff: 3,
  //   //   scheduledStaff: 2,
  //   //   type: "class",
  //   //   scheduling: [
  //   //     { timeRange: "8:00 AM - 1:00 PM", typeOf: "inRatio" },
  //   //     { timeRange: "1:00 PM - 3:00 PM", typeOf: "underRatio" },
  //   //     { timeRange: "3:00 PM - 5:00 PM", typeOf: "inRatio" },
  //   //     { timeRange: "5:00 PM - 5:30 PM", typeOf: "overRatio" },
  //   //   ],
  //   //   staff: [
  //   //     {
  //   //       id: 1,
  //   //       name: "Jessica Rhodes",
  //   //       duration: { scheduled: 55, available: 43 },
  //   //       type: "staff",
  //   //       avatar: "/classroom_icons/png/Aadhira.png",
  //   //       scheduling: [
  //   //         { timeRange: "8:00 AM - 1:00 PM", typeOf: "inRatio" },
  //   //         { timeRange: "1:00 PM - 3:00 PM", typeOf: "underRatio" },
  //   //         { timeRange: "3:00 PM - 5:00 PM", typeOf: "inRatio" },
  //   //       ],
  //   //     },
  //   //     {
  //   //       id: 2,
  //   //       name: "Ana Biwalkar",
  //   //       duration: { scheduled: 55, available: 43 },
  //   //       type: "staff",
  //   //       avatar: "/classroom_icons/png/Aarav.png",
  //   //       scheduling: [
  //   //         { timeRange: "8:00 AM - 1:00 PM", typeOf: "inRatio" },
  //   //         { timeRange: "1:00 PM - 3:00 PM", typeOf: "underRatio" },
  //   //         { timeRange: "3:00 PM - 5:00 PM", typeOf: "inRatio" },
  //   //       ],
  //   //     },
  //   //     {
  //   //       id: 3,
  //   //       name: "Lana Rhodes",
  //   //       duration: { scheduled: 55, available: 43 },
  //   //       type: "staff",
  //   //       avatar: "/classroom_icons/png/Aadhira.png",
  //   //       scheduling: [
  //   //         { timeRange: "8:00 AM - 1:00 PM", typeOf: "inRatio" },
  //   //         { timeRange: "1:00 PM - 2:00 PM", typeOf: "underRatio" },
  //   //         { timeRange: "2:00 PM - 4:10 PM", typeOf: "inRatio" },
  //   //       ],
  //   //     },
  //   //   ],
  //   // },
  // ];
  const ClassHeader = ({ data }) => {
    const { name } = data;
    const { initials, backgroundColor } = getInitialsTitleWithColor(name);

    return (
      <>
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-2">
            <Avatar
              size={24}
              style={{
                backgroundColor: backgroundColor,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {initials}
            </Avatar>
            <span className="label-20-600">{name}</span>
          </div>
          <div className="d-flex justify-content-between gap16">
            <div className="d-flex align-items-center gap10">
              <div
                style={{
                  width: 9,
                  height: 9,
                  background: "#F38D8D",
                  borderRadius: 9999,
                }}
              />
              <div className="label-12-500">Under Ratio/Break/Absent</div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div
                style={{
                  width: 9,
                  height: 9,
                  background: "#ACF3AA",
                  borderRadius: 9999,
                }}
              />
              <div className="label-12-500">In Ratio/Present</div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div
                style={{
                  width: 9,
                  height: 9,
                  background: "#5978F7",
                  borderRadius: 9999,
                }}
              />
              <div className="label-12-500">Over Ratio</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ClassTeacherList = ({ data }) => {
    const classScheduling = data?.scheduling;

    return (
      <>
        {/* <div>
          <div className="d-flex justify-content-between gap16">
            <div
              className="d-flex gap16 align-items-center"
              style={{ width: "20%" }}
            >
              <div className="label-14-500 mx-3">Class Schedule</div>
              <div
                style={{
                  width: 0,
                  height: 50,
                  border: "1px rgba(0.49, 0.49, 0.49, 0.10) solid",
                }}
              ></div>
            </div>
            <CardGrid
              scheduleType="classScheduling"
              scheduling={classScheduling}
            />
          </div>
          <div
            className="mt12 mb12"
            style={{
              height: 0,
              border: "1px rgba(0.49, 0.49, 0.49, 0.10) solid",
            }}
          ></div>
        </div> */}
        <div>
          <div className="d-flex ">
            <div className="d-flex gap16 ">
              <div className="d-flex justify-content-between align-items-center gap12">
                <div className=" d-flex teacher-name-container align-items-start width152">
                  <div className="label-14-500 ">Class Schedule</div>
                </div>
              </div>
              <div
                style={{
                  width: 0,
                  height: 50,
                  border: "1px rgba(0.49, 0.49, 0.49, 0.10) solid",
                }}
              ></div>
            </div>
            <CardGrid
              scheduleType="classScheduling"
              scheduling={classScheduling}
              schedule={data}
              date={date}
            />
          </div>
          <div
            className="mt12 mb12"
            style={{
              height: 0,
              border: "1px rgba(0.49, 0.49, 0.49, 0.10) solid",
            }}
          ></div>
        </div>
        {data?.staff?.map((staffdata) => (
          <div>
            <div className="d-flex  ">
              <div className="d-flex  ">
                <div className="d-flex align-items-center gap16">
                  {/* <Avatar
                    src={staffdata.avatar}
                    alt={staffdata.name}
                    size={24}
                  /> */}
                  <Avatar
                    src={staffdata?.avatar || null} // Use avatar if available
                    size={24}
                    style={{
                      backgroundColor: !staffdata?.avatar
                        ? getInitialsTitleWithColor(staffdata.name)
                            .backgroundColor
                        : "transparent", // Set background color if no avatar
                    }}
                  >
                    {!staffdata?.avatar &&
                      getInitialsTitleWithColor(staffdata.name).initials}
                  </Avatar>
                  <div className="teacher-name-container">
                    <div className="label-14-500">{staffdata.name}</div>
                    <div className="teacher-time-container">
                      <div className="teacher-toggle-history">
                        <Avatar
                          size={20}
                          src={"/wow_icons/png/history_toggle_off.png"}
                        />
                        <div className="label-12-500 mr8">
                          {staffdata?.duration?.available}h
                        </div>
                      </div>
                      <div className="teacher-more-time">
                        <img
                          className="width20 height18"
                          src={"/wow_icons/png/more_time.png"}
                        />
                        <div className="label-12-500 mr8">
                          {staffdata?.duration?.scheduled}h
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: 0,
                    height: 50,
                    border: "1px rgba(0.49, 0.49, 0.49, 0.10) solid",
                  }}
                ></div>
              </div>
              <CardGrid
                scheduleType="staffSchedule"
                scheduling={staffdata?.scheduling}
                schedule={data}
                date={date}
              />
            </div>
            <div
              className="mt12 mb12"
              style={{
                height: 0,
                border: "1px rgba(0.49, 0.49, 0.49, 0.10) solid",
              }}
            ></div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <Card styles={{ body: { padding: 8 } }}>
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
        >
          {schedulingData?.map((data) => (
            <Collapse
              key={data?.id}
              className="schedule-actor-card"
              collapsible="header"
              defaultActiveKey={[data?.id]}
              items={[
                {
                  key: data?.id,
                  label: <ClassHeader data={data} />,
                  children: <ClassTeacherList data={data} />,
                },
              ]}
            />
          ))}
        </Space>
      </Card>
    </>
  );
}
