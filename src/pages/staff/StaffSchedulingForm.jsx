// import React, { useState } from "react";
// import { Modal, Button, Row, Col, Tag } from "antd";
// import TimePickerComponent from "../../components/timePicker/TimePickerComponent";
// import ButtonComponent from "../../components/ButtonComponent";

// export default function StaffScheduleForm({ CardTitle, onSave }) {
//   const [schedule, setSchedule] = useState([
//     {
//       day: "Monday",
//       workTime: { start: "07:30 AM", end: "05:30 PM" },
//       breakTime: { start: "12:30 PM", end: "01:00 PM" },
//     },
//     {
//       day: "Tuesday",
//       workTime: { start: "07:30 AM", end: "05:30 PM" },
//       breakTime: { start: "12:30 PM", end: "01:00 PM" },
//     },
//     {
//       day: "Wednesday",
//       workTime: { start: "07:30 AM", end: "05:30 PM" },
//       breakTime: { start: "12:30 PM", end: "01:00 PM" },
//     },
//     {
//       day: "Thursday",
//       workTime: { start: "07:30 AM", end: "05:30 PM" },
//       breakTime: { start: "12:30 PM", end: "01:00 PM" },
//     },
//     {
//       day: "Friday",
//       workTime: { start: "07:30 AM", end: "05:30 PM" },
//       breakTime: { start: "12:30 PM", end: "01:00 PM" },
//     },
//   ]);

//   const format = "hh:mm A";

//   const handleTimeChange = (day, timeType, startEnd, time) => {
//     if (time) {
//       setSchedule((prevSchedule) =>
//         prevSchedule.map((item) =>
//           item.day === day
//             ? {
//                 ...item,
//                 [timeType]: {
//                   ...item[timeType],
//                   [startEnd]: time.format(format),
//                 },
//               }
//             : item
//         )
//       );
//     }
//   };

//   return (
//     <div className="card">
//       <span
//         style={{
//           backgroundColor: "#eef1fe",
//           fontWeight: "bold",
//           padding: 15,
//           borderRadius: "8px 8px 0 0",
//         }}
//       >
//         {CardTitle}
//       </span>
//       <div className="my-4 mx-4">
//         <div className="text-center">
//           <div className="label-14-500 mb20">Work Time</div>
//         </div>
//         {schedule.map((item) => (
//           <Row
//             key={item.day}
//             align="middle"
//             justify="space-between"
//             style={{ marginBottom: "24px" }}
//           >
//             <Col span={4}>
//               <Tag
//                 style={{
//                   backgroundColor: "#F3F2FF",
//                   color: "#1d1d1d",
//                   border: "none",
//                   padding: "4px 12px",
//                   borderRadius: "4px",
//                 }}
//               >
//                 {item.day}
//               </Tag>
//             </Col>

//             {/* Work Time Section */}
//             <Col span={10}>
//               <Row gutter={[20, 5]} align="middle">
//                 <Col>
//                   <div className="label-12-400 mb10">Start</div>
//                   <TimePickerComponent
//                     value={item.workTime.start}
//                     format={format}
//                     onChange={(time) =>
//                       handleTimeChange(item.day, "workTime", "start", time)
//                     }
//                   />
//                 </Col>
//                 <Col>
//                   <div className="label-12-400 mb10">End</div>
//                   <TimePickerComponent
//                     value={item.workTime.end}
//                     format={format}
//                     onChange={(time) =>
//                       handleTimeChange(item.day, "workTime", "end", time)
//                     }
//                   />
//                 </Col>
//               </Row>
//             </Col>

//             {/* Break Time Section */}
//             <Col span={10}>
//               {/* <div
//                 style={{
//                   marginBottom: "4px",
//                   color: "#666",
//                   fontSize: "12px",
//                 }}
//               >
//                 Break Time
//               </div> */}
//               <Row gutter={[20, 20]} align="middle">
//                 <Col>
//                   <div className="label-12-400 mb10">Break Start</div>
//                   <TimePickerComponent
//                     value={item.breakTime.start}
//                     format={format}
//                     onChange={(time) =>
//                       handleTimeChange(item.day, "breakTime", "start", time)
//                     }
//                   />
//                 </Col>
//                 <Col>
//                   <div className="label-12-400 mb10">Break End</div>
//                   <TimePickerComponent
//                     value={item.breakTime.end}
//                     format={format}
//                     onChange={(time) =>
//                       handleTimeChange(item.day, "breakTime", "end", time)
//                     }
//                   />
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         ))}

//         <div className="text-center mt5">
//           <ButtonComponent text={"Save"} padding="16.1px 60px" type="submit" />
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Row, Col, Tag } from "antd";
import TimePickerComponent from "../../components/timePicker/TimePickerComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { formatTime } from "../../services/common";
import { CustomMessage } from "../../utils/CustomMessage";
import {
  useCreateWeekSchedules,
  useUpdateWeekSchedules,
} from "../../hooks/useWeekSchedule";

export default function StaffScheduleForm({
  CardTitle = "Staff Schedule Form",
  data = [],
  Id,
  module,
  closeModal,
}) {
  const format = "hh:mm A";

  const [schedule, setSchedule] = useState([]);
  const createWeekSchedules = useCreateWeekSchedules();
  const updateWeekSchedules = useUpdateWeekSchedules();

  useEffect(() => {
    if (data.length > 0) {
      const mappedSchedule = data.map((item) => ({
        id: item.id,
        day: item.dayOfWeek.charAt(0) + item.dayOfWeek.slice(1).toLowerCase(),
        scheduleTime: {
          start: formatTime(item.startTime),
          end: formatTime(item.endTime),
        },
        breakTime: {
          start: formatTime(item.breakStartTime || "00:00 AM"),
          end: formatTime(item.breakEndTime || "00:00 PM"),
        },
      }));
      setSchedule(mappedSchedule);
    } else {
      setSchedule([
        {
          day: "Monday",
          scheduleTime: { start: "00:00 AM", end: "00:00 PM" },
          breakTime: { start: "12:00 PM", end: "01:00 PM" },
        },
        {
          day: "Tuesday",
          scheduleTime: { start: "00:00 AM", end: "00:00 PM" },
          breakTime: { start: "12:00 PM", end: "01:00 PM" },
        },
        {
          day: "Wednesday",
          scheduleTime: { start: "00:00 AM", end: "00:00 PM" },
          breakTime: { start: "12:00 PM", end: "01:00 PM" },
        },
        {
          day: "Thursday",
          scheduleTime: { start: "00:00 AM", end: "00:00 PM" },
          breakTime: { start: "12:00 PM", end: "01:00 PM" },
        },
        {
          day: "Friday",
          scheduleTime: { start: "00:00 AM", end: "00:00 PM" },
          breakTime: { start: "12:00 PM", end: "01:00 PM" },
        },
      ]);
    }
  }, [data]);

  const handleTimeChange = (day, timeType, startEnd, time) => {
    if (time) {
      setSchedule((prevSchedule) =>
        prevSchedule.map((item) =>
          item.day === day
            ? {
                ...item,
                [timeType]: {
                  ...item[timeType],
                  [startEnd]: time.format(format),
                },
              }
            : item
        )
      );
    }
  };

  const handleSave = async () => {
    const formattedSchedule = schedule.map((item) => {
      const idField = module === "staff" ? { staffId: Id } : { studentId: Id };

      return {
        ...(item.id ? { id: item.id } : {}),
        ...idField,
        dayOfWeek: item.day.toUpperCase(),
        startTime: convertTo24HourFormat(item.scheduleTime.start),
        endTime: convertTo24HourFormat(item.scheduleTime.end),
        breakStartTime: convertTo24HourFormat(item.breakTime.start),
        breakEndTime: convertTo24HourFormat(item.breakTime.end),
      };
    });

    try {
      if (data.length === 0) {
        await createWeekSchedules.mutateAsync(formattedSchedule);
        CustomMessage.success("Week schedules created successfully!");
      } else {
        await updateWeekSchedules.mutateAsync(formattedSchedule);
        CustomMessage.success("Week schedules updated successfully!");
      }
      closeModal();
    } catch (error) {
      CustomMessage.error(`Error occurred: ${error.message}`);
    }
  };

  const convertTo24HourFormat = (time) => {
    const [hourMinSec, modifier] = time.split(" ");
    let [hours, minutes, seconds] = hourMinSec.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    }
    if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds || "00").padStart(2, "0")}`;
  };

  return (
    <div className="card">
      <span
        style={{
          backgroundColor: "#eef1fe",
          fontWeight: "bold",
          padding: 15,
          borderRadius: "8px 8px 0 0",
          display: "block",
        }}
      >
        {CardTitle}
      </span>
      <div className="my-4 mx-4">
        <div className="text-center">
          <div className="label-14-500 mb20">Schedule Time</div>
        </div>
        {schedule.map((item) => (
          <Row
            key={item.day}
            align="top"
            justify="space-between"
            style={{ marginBottom: "24px" }}
          >
            <Col span={4}>
              <Tag
                style={{
                  backgroundColor: "#F3F2FF",
                  color: "#1d1d1d",
                  border: "none",
                  padding: "4px 12px",
                  borderRadius: "4px",
                }}
              >
                {item.day}
              </Tag>
            </Col>

            <Col span={10}>
              <Row gutter={[20, 5]} align="middle">
                <Col>
                  <div className="label-12-400 mb10">Start</div>
                  <TimePickerComponent
                    value={item.scheduleTime.start}
                    format={format}
                    onChange={(time) =>
                      handleTimeChange(item.day, "scheduleTime", "start", time)
                    }
                  />
                </Col>
                <Col>
                  <div className="label-12-400 mb10">End</div>
                  <TimePickerComponent
                    value={item.scheduleTime.end}
                    format={format}
                    onChange={(time) =>
                      handleTimeChange(item.day, "scheduleTime", "end", time)
                    }
                  />
                </Col>
              </Row>
            </Col>
            <Col span={10}>
              <Row gutter={[20, 5]} align="middle">
                <Col>
                  <div className="label-12-400 mb10">Break Start</div>
                  <TimePickerComponent
                    value={item.breakTime.start}
                    format={format}
                    onChange={(time) =>
                      handleTimeChange(item.day, "breakTime", "start", time)
                    }
                  />
                </Col>
                <Col>
                  <div className="label-12-400 mb10">Break End</div>
                  <TimePickerComponent
                    value={item.breakTime.end}
                    format={format}
                    onChange={(time) =>
                      handleTimeChange(item.day, "breakTime", "end", time)
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        ))}

        <div className="text-center mt5">
          <ButtonComponent
            text={"Save"}
            padding="16.1px 60px"
            type="submit"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
