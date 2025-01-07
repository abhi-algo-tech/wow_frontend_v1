import React, { useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";

function AldabilTable({ schedules = [] }) {
  const [selected, setSelected] = useState(new Date());

  const weekConfig = {
    weekDays: [0, 1, 2, 3, 4], // Show monday to friday
    weekStartOn: 1, // Start week on Monday
    startHour: 7, // Display from 7 AM
    endHour: 19, // Display until 7 PM
    step: 60, // 1-hour steps
  };

  // Format dates for headers
  const formatDateHeader = (date) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options); // Example: "Mon, Nov 18"
  };

  // Transform the schedules array into events
  const events = schedules?.flatMap((schedule, index) => {
    const {
      scheduleDate,
      startShift,
      endShift,
      breakShift,
      breakEndShift,
      classroomName,
    } = schedule;

    // Helper to validate date and time values
    const isValidDateTime = (date, time) =>
      date !== "null" &&
      time !== "null" &&
      !isNaN(new Date(`${date}T${time.split(".")[0]}`).getTime());

    // Helper to create a Date object from date and time
    const createDateTime = (date, time) =>
      new Date(`${date}T${time.split(".")[0]}`);

    // Validate schedule data
    if (
      !isValidDateTime(scheduleDate, startShift) ||
      !isValidDateTime(scheduleDate, endShift) ||
      !isValidDateTime(scheduleDate, breakShift) ||
      !isValidDateTime(scheduleDate, breakEndShift)
    ) {
      // Handle invalid schedule gracefully by returning an empty array
      return [];
    }

    // Create separate event objects
    const morningSession = {
      event_id: index * 3 + 1, // Unique ID for each session
      title: (
        <span className="text-center label-14-800">{`${
          classroomName || "N/A"
        } (Morning Session)`}</span>
      ),
      start: createDateTime(scheduleDate, startShift),
      end: createDateTime(scheduleDate, breakShift),
      color: "rgb(223 234 254)",
      textColor: "rgb(87 51 83)",
    };

    const breakSession = {
      event_id: index * 3 + 2, // Unique ID for the break session
      title: <span className="">{`🍝 Lunch Break`}</span>,
      start: createDateTime(scheduleDate, breakShift),
      end: createDateTime(scheduleDate, breakEndShift),
      color: "rgb(254 241 199)",
      textColor: "rgb(87 51 83)",
    };

    const afternoonSession = {
      event_id: index * 3 + 3, // Unique ID for the afternoon session
      title: (
        <span className="text-center label-14-800">{`${
          classroomName || "N/A"
        } (Afternoon Session)`}</span>
      ),
      start: createDateTime(scheduleDate, breakEndShift),
      end: createDateTime(scheduleDate, endShift),
      color: "rgb(223 234 254)",
      textColor: "rgb(87 51 83)",
    };

    // Return all three sessions as an array
    return [morningSession, breakSession, afternoonSession];
  });

  // Log the final events array
  console.log("events", events);

  return (
    <Scheduler
      view="week"
      agenda={false}
      selectedDate={selected}
      week={{
        ...weekConfig,
        navigation: false,
        disableGoToDay: false,
      }}
      events={events}
      //   events={[
      //     {
      //       event_id: 1,
      //       title: <h2 className="text-center">1-Blue-D</h2>,
      //       start: new Date("2025/1/7 07:30"), // Tuesday
      //       end: new Date("2025/1/7 16:30"),
      //     },
      //     {
      //       event_id: 2,
      //       title: "Event 2",
      //       start: new Date("2025/1/6 13:30"), // Monday
      //       end: new Date("2025/1/6 18:30"),
      //     },
      //   ]}
    />
  );
}

export default AldabilTable;
