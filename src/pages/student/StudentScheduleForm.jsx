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

export default function StudentScheduleForm({
  CardTitle = "Schedule Form",
  data = [],
  Id,
  module,
  closeModal,
}) {
  const format = "hh:mm A";

  // Initialize schedule from data prop
  const [schedule, setSchedule] = useState([]);
  const createWeekSchedules = useCreateWeekSchedules(); // Create hook
  const updateWeekSchedules = useUpdateWeekSchedules(); // Update hook

  useEffect(() => {
    if (data.length > 0) {
      const mappedSchedule = data.map((item) => ({
        id: item.id,
        day: item.dayOfWeek.charAt(0) + item.dayOfWeek.slice(1).toLowerCase(), // Format day
        scheduleTime: {
          start: formatTime(item.startTime),
          end: formatTime(item.endTime),
        },
      }));
      setSchedule(mappedSchedule);
    } else {
      // Default schedule if no data is provided
      setSchedule([
        {
          day: "Monday",
          scheduleTime: { start: "00:00 AM", end: "00:00 PM" },
        },
        {
          day: "Tuesday",
          scheduleTime: { start: "00:00 AM", end: "00:00 PM" },
        },
        {
          day: "Wednesday",
          scheduleTime: { start: "00:00 AM", end: "00:00 PM" },
        },
        {
          day: "Thursday",
          scheduleTime: { start: "00:00 AM", end: "00:00 PM" },
        },
        {
          day: "Friday",
          scheduleTime: { start: "00:00 AM", end: "00:00 PM" },
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
    const formattedSchedule = schedule
      .map((item) => {
        // Check if start time is 00:00, if so, skip this day
        if (item.scheduleTime.start === "12:00:00") {
          return null; // Or return `undefined` to filter out the item in the next step
        } else {
          const idField =
            module === "student" ? { studentId: Id } : { staffId: Id }; // Conditional field

          return {
            ...(item.id ? { id: item.id } : {}), // Include 'id' only if it's not null
            ...idField, // Spread the conditional field
            dayOfWeek: item.day.toUpperCase(),
            startTime: convertTo24HourFormat(item.scheduleTime.start),
            endTime: convertTo24HourFormat(item.scheduleTime.end),
          };
        }
      })
      .filter((item) => item !== null); // Filter out null values if any

    try {
      if (data.length === 0) {
        // Create schedules if no data exists
        await createWeekSchedules.mutateAsync(formattedSchedule); // Use mutateAsync for awaitable mutations
        CustomMessage.success("Week schedules created successfully!");
      } else {
        // Update schedules if data exists
        await updateWeekSchedules.mutateAsync(formattedSchedule); // Use mutateAsync for awaitable mutations
        CustomMessage.success("Week schedules updated successfully!");
      }
      closeModal();
    } catch (error) {
      CustomMessage.error(`Error occurred: ${error.message}`);
    }
    closeModal();
  };

  const convertTo24HourFormat = (time) => {
    const [hourMinSec, modifier] = time.split(" ");
    let [hours, minutes, seconds] = hourMinSec.split(":");

    // Handle PM case
    if (modifier === "PM" && hours !== "12") {
      hours = parseInt(hours, 10) + 12; // Convert PM time to 24-hour format
    }
    // Handle AM case for 12:00
    if (modifier === "AM" && hours === "12") {
      hours = "00"; // Convert 12:00 AM to 00:00
    }

    // Ensure hours, minutes, and seconds are two digits
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
            justify="center"
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
