export const getInitialsTitle = (name) => {
  // Check if name is defined and is a string
  if (!name || typeof name !== "string") {
    return ""; // Return an empty string or any fallback value you prefer
  }

  return name
    .replace(/^\d+-?/, "") // Remove leading numbers followed by an optional hyphen
    .split(/[\s-]+/) // Split by spaces or hyphens
    .map((word) => word.charAt(0).toUpperCase()) // Get the first letter and capitalize it
    .join(""); // Join the initials together
};

export const getInitialsTitleWithColor = (name) => {
  // Check if name is defined and is a string
  if (!name || typeof name !== "string") {
    return { initials: "", backgroundColor: "" }; // Return an empty object for safety
  }

  // Function to generate a random background color
  const getRandomColor = () => {
    const colors = [
      "#0000FF",
      "#008000",
      "#800080",
      "#FDCD16",
      "#FFC0CB",
      "#FF0000",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const initials = name
    .replace(/^\d+-?/, "") // Remove leading numbers followed by an optional hyphen
    .split(/[\s-]+/) // Split by spaces or hyphens
    .map((word) => word.charAt(0).toUpperCase()) // Get the first letter and capitalize it
    .join(""); // Join the initials together

  return {
    initials,
    backgroundColor: getRandomColor(),
  };
};

export const generateRandomHexColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Define a color map
const classroomNames = [
  "1-Blue-D",
  "2-Green-D",
  "3-Purple-D",
  "4-Yellow-D",
  "5-Green-P",
  "6-Pink-P",
  "7-Yellow-P",
  "8-Blue-P",
  "Summer Camp 1",
  "Green Room",
  "After School",
  "Summer Camp 2",
];

// Define a color map
const colorMap = {
  blue: "#0000FF",
  green: "#008000",
  purple: "#800080",
  yellow: "#FDCD16",
  pink: "#FFC0CB",
  red: "#FF0000",
};

// Generate color for a single classroom name
const generateColorForClassroom = (name) => {
  // Extract the color keyword
  const lowerCaseName = name.toLowerCase();
  const foundColor = Object.keys(colorMap).find((color) =>
    lowerCaseName.includes(color)
  );

  // Return the corresponding color or a random hex color if not found
  return foundColor ? colorMap[foundColor] : generateRandomHexColor();
};

export const generateClassroomDemoData = (count) => {
  const classroomNames = [
    "1-Blue-D",
    "2-Green-D",
    "3-Purple-D",
    "4-Yellow-D",
    "5-Green-P",
    "6-Pink-P",
    "7-Yellow-P",
    "8-Blue-P",
    "Summer Camp 1",
    "Green Room",
    "After School",
    "Summer Camp 2",
  ];

  const statuses = ["warning", "success"];

  const data = [];

  for (let i = 0; i < count; i++) {
    const name = classroomNames[i % classroomNames.length];
    const shortName = getInitialsTitle(name);
    const color = generateRandomHexColor();

    data.push({
      key: (i + 1).toString(),
      name,
      shortName,
      color,
      capacity: Math.floor(Math.random() * 20) + 15, // Random capacity between 15 and 34
      fte: `${Math.floor(Math.random() * 20) + 75}%`, // Random FTE between 75% and 95%
      active: Math.floor(Math.random() * 20) + 5, // Random active students between 5 and 24
      upcoming: Math.floor(Math.random() * 5), // Random upcoming students between 0 and 4
      present: Math.floor(Math.random() * 20) + 5, // Random present students between 5 and 24
      assignedStaff: Math.floor(Math.random() * 4) + 1, // Random assigned staff between 1 and 4
      presentStaff: Math.floor(Math.random() * 4), // Random present staff between 0 and 3
      status: statuses[Math.floor(Math.random() * statuses.length)], // Random status
    });
  }

  return data;
};

export const generateClassroomData = (apiData) => {
  return apiData?.map((item) => ({
    key: item.id.toString(),
    name: item.name,
    shortName: getInitialsTitle(item.name),
    color: item.profileUrl
      ? item.profileUrl
      : generateColorForClassroom(item?.name),
    capacity: item.maxCapacity,
    fte: `${item.staffRatio}%`,
    active: Math.floor(Math.random() * item.maxCapacity), // Replace with actual data if available
    upcoming: Math.floor(Math.random() * 3), // Replace with actual data if available
    present: Math.floor(Math.random() * item.maxCapacity), // Replace with actual data if available
    assignedStaff: Math.floor(Math.random() * 4) + 1, // Assuming this is staff-to-student ratio
    presentStaff: Math.floor(Math.random() * 3) + 1, // Assuming 80% staff presence as an example
    // status: item.status === "Active" ? "success" : "warning",
    status: item.status,
    ratio: Number(item.staffRatio) >= 75 ? "success" : "warning",
  }));
};

export function formatDateToCustomStyle(dateStr) {
  const date = new Date(dateStr);
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export function formatTime(time) {
  const [hour, minute] = time.split(":");
  const date = new Date();
  date.setHours(hour, minute);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
