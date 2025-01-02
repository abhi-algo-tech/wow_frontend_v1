export const reStructureScheduleArray = (dataArray) => {
  const days = ["mon", "tue", "wed", "thu", "fri"];

  return dataArray.map((data) => {
    const schedule = {};

    // Initialize schedule with false
    days.forEach((day) => {
      schedule[day] = false;
    });

    const teachers = data.staffs.map((staff) => {
      // Map schedules and mark available days
      const mappedSchedules = staff.schedules.map((sch) => {
        const day = sch.scheduleDays.toLowerCase().slice(0, 3);
        schedule[day] = true; // Update schedule for the day
        return {
          id: sch.scheduleId,
          day: day,
          time: `${sch.startShift.slice(0, 5)} - ${sch.endShift.slice(0, 5)}`,
          status: sch.isPublished ? "published" : "unpublished",
          startTime: sch?.startShift.slice(0, 8),
          endTime: sch?.endShift.slice(0, 8),
          breakStartTime: sch?.breakShift.slice(0, 8),
          breakEndTime: sch?.breakEndShift.slice(0, 8),
        };
      });

      // Ensure all days are represented in the schedule
      const completeSchedule = days.map((day) => {
        const existing = mappedSchedules.find((sch) => sch.day === day);
        return (
          existing || {
            id: day,
            day: day,
            time: "",
            status: "",
          }
        );
      });

      return {
        id: staff.staffId.toString(),
        name: staff.staffName,
        avatar: `/classroom_icons/png/Avatar_${staff.staffId}.png`, // Dummy avatar URL
        duration: {
          first: Math.floor(staff.availableHours), // availableHours is first
          second: Math.floor(staff.scheduledHours), // scheduledHours is second
        },
        schedule: completeSchedule, // Include all days
      };
    });

    return {
      key: data.classroomId,
      name: data.classroomName,
      teachers: teachers,
      schedule: schedule,
    };
  });
};

import dayjs from "dayjs";

export const getDateForDay = (dateRange, dayName) => {
  const { startDate, endDate } = dateRange;
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  // Convert the day name to a number (Sunday: 0, Monday: 1, ..., Saturday: 6)
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const targetDay = daysOfWeek.indexOf(dayName.toLowerCase());

  if (targetDay === -1) {
    throw new Error(
      "Invalid day name. Use short names like 'mon', 'tue', etc."
    );
  }

  // Iterate through the date range to find the matching day
  let current = start;
  while (current.isBefore(end) || current.isSame(end)) {
    if (current.day() === targetDay) {
      return current.format("YYYY-MM-DD");
    }
    current = current.add(1, "day");
  }

  // If no matching day is found
  return null;
};

export const getDayNameByDate = (date) => {
  console.log("date", date);

  const parsedDate = dayjs(date);
  if (!parsedDate.isValid()) {
    console.error("Invalid date:", date);
    return null;
  }
  return parsedDate.format("dddd").toLowerCase();
};

export const validateTime = (time) => {
  if (!time || time === "00:00:00") {
    return ""; // Return blank if time is invalid or "00:00:00"
  }
  const formattedTime = dayjs(time, "HH:mm:ss");
  return formattedTime.isValid() ? formattedTime.format("HH:mm") : ""; // Format if valid, otherwise keep blank
};
