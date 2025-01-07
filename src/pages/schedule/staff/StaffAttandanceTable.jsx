import React, { useEffect, useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";

function StaffAttendanceTable({ schedules = [], startDate = null }) {
  const [selected, setSelected] = useState();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (startDate) {
      const newSelectedDate = new Date(`${startDate}`);
      if (!isNaN(newSelectedDate.getTime())) {
        setSelected(newSelectedDate);
      }
    }
  }, [startDate]);

  useEffect(() => {
    const uniqueEvents = new Set(); // To track unique events

    const transformedEvents = schedules?.flatMap((schedule, index) => {
      const {
        scheduleId,
        scheduleDate,
        startShift,
        endShift,
        breakShift,
        breakEndShift,
        classroomName,
      } = schedule;

      const isValidDateTime = (date, time) =>
        date !== "null" &&
        time !== "null" &&
        !isNaN(new Date(`${date}T${time.split(".")[0]}`).getTime());

      const createDateTime = (date, time) =>
        new Date(`${date}T${time.split(".")[0]}`);

      if (
        !isValidDateTime(scheduleDate, startShift) ||
        !isValidDateTime(scheduleDate, endShift) ||
        !isValidDateTime(scheduleDate, breakShift) ||
        !isValidDateTime(scheduleDate, breakEndShift)
      ) {
        console.error("Invalid schedule detected:", schedule);
        return [];
      }

      const createUniqueKey = (start, end, index) =>
        `${scheduleDate || "unknown-date"}-${start || "unknown-start"}-${
          end || "unknown-end"
        }-${index}`;

      const sessions = [
        {
          id: scheduleId + index * 3 + 1,
          title: (
            <span className="text-center label-14-800">{`${
              classroomName || "N/A"
            } `}</span>
          ),
          start: createDateTime(scheduleDate, startShift),
          end: createDateTime(scheduleDate, breakShift),
          color: "rgb(223 234 254)",
          textColor: "rgb(87 51 83)",
          key: createUniqueKey(startShift, breakShift, index * 3 + 1),
        },
        {
          id: scheduleId + index * 3 + 2,
          title: <span className="">{`🍝 Lunch Break`}</span>,
          start: createDateTime(scheduleDate, breakShift),
          end: createDateTime(scheduleDate, breakEndShift),
          color: "rgb(254 241 199)",
          textColor: "rgb(87 51 83)",
          key: createUniqueKey(breakShift, breakEndShift, index * 3 + 2),
        },
        {
          id: scheduleId + index * 3 + 3,
          title: (
            <span className="text-center label-14-800">{`${
              classroomName || "N/A"
            } `}</span>
          ),
          start: createDateTime(scheduleDate, breakEndShift),
          end: createDateTime(scheduleDate, endShift),
          color: "rgb(223 234 254)",
          textColor: "rgb(87 51 83)",
          key: createUniqueKey(breakEndShift, endShift, index * 3 + 3),
        },
      ];

      return sessions.filter((session) => {
        if (uniqueEvents.has(session.key)) {
          console.warn("Duplicate key detected:", session.key);
          return false; // Skip duplicate
        }
        uniqueEvents.add(session.key);
        return true; // Include non-duplicate
      });
    });

    setEvents(transformedEvents || []);
  }, [schedules]);

  const weekConfig = {
    weekDays: [0, 1, 2, 3, 4], // Show Monday to Friday
    weekStartOn: 1, // Start week on Monday
    startHour: 7, // Display from 7 AM
    endHour: 19, // Display until 7 PM
    step: 60, // 1-hour steps
  };

  return (
    <Scheduler
      key={`${startDate}-${events.length}`} // Ensure Scheduler re-renders
      view="week"
      agenda={false}
      selectedDate={selected}
      week={{
        ...weekConfig,
        navigation: false,
        disableGoToDay: false,
      }}
      events={events}
    />
  );
}

export default StaffAttendanceTable;
