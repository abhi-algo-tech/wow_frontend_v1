import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
// Extend dayjs with the plugin
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

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

export const formateTime = (time) => {
  return dayjs(time, "HH:mm:ss").format("hh:mm A");
};

export const validateTimeRange = (
  defaultStartTime,
  defaultEndTime,
  currentStartTime,
  currentEndTime
) => {
  // Ensure all times are in the same format (12-hour AM/PM format)
  const format = "hh:mm A"; // 12-hour format with AM/PM

  // Convert all times to 12-hour AM/PM format
  const start = dayjs(defaultStartTime, ["HH:mm:ss", "hh:mm"]).format(format);
  const end = dayjs(defaultEndTime, ["HH:mm:ss", "hh:mm"]).format(format);
  const shiftStart = dayjs(currentStartTime, ["HH:mm:ss", "hh:mm"]).format(
    format
  );
  const shiftEnd = dayjs(currentEndTime, ["HH:mm:ss", "hh:mm"]).format(format);

  // Check if shiftStart is greater than or equal to defaultStartTime, and shiftEnd is less than or equal to defaultEndTime
  const isValidStartTime = dayjs(shiftStart, format).isSameOrAfter(
    dayjs(start, format)
  );
  const isValidEndTime = dayjs(shiftEnd, format).isSameOrBefore(
    dayjs(end, format)
  );

  // Both conditions must be true to be valid
  if (isValidStartTime && isValidEndTime) {
    return true; // Valid if within the range
  }

  return false; // Invalid if outside the allowed range
};

// validateTimeRange("09:00:00", "17:00:00" ,"07:00", "19:00")
