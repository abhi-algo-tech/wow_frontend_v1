const staticSchedule = {
  Mon: {
    workHours: "7:30 AM -5:30 PM",
    breakTime: "12:30 PM -1:00 PM",
  },
  Tue: null,
  Wed: {
    workHours: "7:30 AM -5:30 PM",
    breakTime: "12:30 PM -1:00 PM",
  },
  Thu: null,
  Fri: {
    workHours: "7:30 AM -5:30 PM",
    breakTime: "12:30 PM -1:00 PM",
  },
};

const colorMap = {
  blue: "#0000FF",
  green: "#008000",
  purple: "#800080",
  yellow: "#FDCD16",
  pink: "#FFC0CB",
  red: "#FF0000",
};

// Function to generate random hex color
const generateRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
};

// Function to generate initials from name
const generateColorForStaff = (firstName, lastName) => {
  const name = `${firstName} ${lastName}`;
  // Extract the color keyword
  const lowerCaseName = name.toLowerCase();
  const foundColor = Object.keys(colorMap).find((color) =>
    lowerCaseName.includes(color)
  );

  // Return the corresponding color or a random hex color if not found
  return foundColor ? colorMap[foundColor] : generateRandomHexColor();
};

export const generateColorNameForStaff = (name) => {
  // Extract the color keyword
  const lowerCaseName = name.toLowerCase();
  const foundColor = Object.keys(colorMap).find((color) =>
    lowerCaseName.includes(color)
  );

  // Return the corresponding color or a random hex color if not found
  return foundColor ? colorMap[foundColor] : generateRandomHexColor();
};

// Function to generate color based on the name
const generateColorForName = (name) => {
  const lowerCaseName = name.toLowerCase();
  const foundColor = Object.keys(colorMap).find((color) =>
    lowerCaseName.includes(color)
  );
  return foundColor ? colorMap[foundColor] : generateRandomHexColor();
};

// Function to format schedule for the staff
const formatSchedule = (schedule) => {
  return Object.keys(schedule).map((day) => ({
    day,
    ...schedule[day],
  }));
};

// Updated staff data generator
export const generateStaffData = (staffData) => {
  return staffData.map((staff) => {
    // const avatar = {
    //   initials: generateColorForStudent(item.firstName + " " + item.lastName),
    // //   backgroundColor: generateColorForName(staff.name),
    // };

    return {
      key: staff.id, // assuming employeeId as the key
      name: `${staff.firstName} ${staff.lastName}`,
      avatar: staff.profileUrl
        ? staff.profileUrl
        : generateColorForStaff(staff.firstName + " " + staff.lastName),
      primaryClass: staff.classrooms
        ? staff.classrooms.find(
            (classroom) => classroom.id === staff.primaryRoomId
          )?.name || "Unknown"
        : "Unknown", // Default to "Unknown" if primaryRoomId is not found
      subClassroomCount: staff.classrooms
        ? staff.classrooms.length -
          (staff.classrooms.some(
            (classroom) => classroom.id === staff.primaryRoomId
          )
            ? 1
            : 0)
        : 0,
      subClass: staff.classrooms
        ? staff.classrooms.filter(
            (classroom) => classroom.id !== staff.primaryRoomId
          )
        : [],
      designation: staff.designation,
      // schedule: staff.weekSchedules
      //   ? formatSchedule(staff.weekSchedules)
      //   : staticSchedule, // If no schedule, use static data
      schedule: generateSchedule(staff?.weekSchedules),
      email: staff.email,
      phone: staff.phoneNumber,
      isOnline: staff.isActive,
      status: staff?.status,
    };
  });
};

export function generateSchedule(daysData) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  // Return all days as inactive if daysData is null or empty
  if (!daysData || daysData.length === 0) {
    return {
      days: days,
      active: [],
    };
  }

  // Map dayOfWeek from daysData to active/inactive state
  const activeDays = daysData
    .filter((data) => data.startTime !== "00:00:00")
    .map((data) => {
      return days.find((day) =>
        data.dayOfWeek.toUpperCase().startsWith(day.toUpperCase())
      );
    })
    .filter((day) => day); // Remove undefined values in case of mismatch

  return {
    days: days,
    active: activeDays,
  };
}
