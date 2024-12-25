const colorMap = {
  blue: "#0000FF",
  green: "#008000",
  purple: "#800080",
  yellow: "#FDCD16",
  pink: "#FFC0CB",
  red: "#FF0000",
};

const generateRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
};

const generateColorForStudentClassroom = (name) => {
  // const name = `${firstName} ${lastName}`;
  // Extract the color keyword
  const lowerCaseName = name.toLowerCase();
  const foundColor = Object.keys(colorMap).find((color) =>
    lowerCaseName.includes(color)
  );

  // Return the corresponding color or a random hex color if not found
  return foundColor ? colorMap[foundColor] : generateRandomHexColor();
};
const generateColorForStudent = (firstName, lastName) => {
  const name = `${firstName} ${lastName}`;
  // Extract the color keyword
  const lowerCaseName = name.toLowerCase();
  const foundColor = Object.keys(colorMap).find((color) =>
    lowerCaseName.includes(color)
  );

  // Return the corresponding color or a random hex color if not found
  return foundColor ? colorMap[foundColor] : generateRandomHexColor();
};

function generateRandomTag() {
  // Define the possible values for each tag
  const types = ["Full Day", "Half Day"];
  const Allergies = ["Allergies", "Medication", "Photo Permission"];
  const additions = ["", "1", "2", "3", "4"];
  const days = [1, 2, 3, 4, 5];

  // Generate random values for each field
  const randomType = types[Math.floor(Math.random() * types.length)];
  const randomAdditional =
    additions[Math.floor(Math.random() * additions.length)];
  const randomDays = days[Math.floor(Math.random() * days.length)];
  const randomAdditionalItems =
    Allergies[Math.floor(Math.random() * Allergies.length)];

  // Return the generated tag data
  return {
    days: randomDays,
    type: randomType,
    additional: randomAdditional,
    additionalItems: Allergies,
  };
}
const images = [
  "/classroom_icons/png/Ajay.png",
  "/classroom_icons/png/Lex.png",
  "/classroom_icons/png/Lisa.png",
  "/classroom_icons/png/Keri.png",
  "/classroom_icons/png/Erica.png",
  "/classroom_icons/png/Robert.png",
  "/classroom_icons/png/Thomas.png",
  "/classroom_icons/png/Olivia.png",
  "/classroom_icons/png/Lara.png",
  "/classroom_icons/png/Brux.png",
  "/classroom_icons/png/Emma.png",
];
function generateRandomImage() {
  return images[Math.floor(Math.random() * images.length)];
}

// Function to generate random date within a given year range
function getRandomDate(yearStart, yearEnd) {
  const year =
    Math.floor(Math.random() * (yearEnd - yearStart + 1)) + yearStart;
  const month = Math.floor(Math.random() * 12); // Random month (0 to 11)
  const day = Math.floor(Math.random() * 28) + 1; // Random day (1 to 28) to avoid invalid dates
  return new Date(year, month, day);
}

// Function to generate current date for movement within the current month
function getMovementDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // Current month (0 to 11)
  const day = Math.floor(Math.random() * 28) + 1; // Random day (1 to 28) to avoid invalid dates
  return new Date(year, month, day);
}

// Function to format date as 'Aug 18, 2020'
function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

// Function to randomly select elements from an array
function getRandomSubset(array, min, max) {
  const shuffled = array.sort(() => 0.5 - Math.random()); // Shuffle array
  const count = Math.floor(Math.random() * (max - min + 1)) + min; // Random number between min and max
  return shuffled.slice(0, count); // Select the first 'count' elements
}

// Function to generate schedule
// export function generateSchedule(daysData) {
//   const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
//   const active = getRandomSubset(days, 3, 5); // Select between 3 and 5 active days
//   return {
//     days: days,
//     active: active,
//   };
// }
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
function generateRandomStatus() {
  const randomValue = Math.random();
  // console.log(randomValue, randomValue < 0.5 ? "present" : "absent"); // Log the random number to debug
  return randomValue < 0.5 ? "present" : "absent";
}
function generateRandomUpcoming() {
  const randomValue = Math.random();
  // console.log(randomValue, randomValue < 0.5 ? "present" : "absent"); // Log the random number to debug
  return randomValue < 0.5 ? true : false;
}

export const generateStudentData = (apiData) => {
  return apiData.map((item, index) => ({
    key: item.id,
    name: item.firstName + " " + item.lastName,
    avatar: generateRandomImage(),
    // avatar: item.profileUrl
    //   ? item.profileUrl
    //   : generateColorForStudent(item.firstName, item.lastName), // Use the student's name to generate a color if no avatar URL is available
    classroom: {
      name: item.classroomName,
      color: item.classroomProfileUrl
        ? item.classroomProfileUrl
        : generateColorForStudentClassroom(item.classroomName),
    },
    tags: item?.tags, // { days: 3, type: "Full Day", additional: "+3" },
    // tags: generateRandomTag(), // { days: 3, type: "Full Day", additional: "+3" },
    schedule: generateSchedule(item?.weekSchedules),
    // schedule: {
    //   days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    //   active: ["Mon", "Wed", "Fri"],
    // },
    // birthdate: item.birthdate || formatDate(getRandomDate(2010, 2024)),
    birthdate: item.dateOfBirth,
    movementDate: item.movementDate || formatDate(getMovementDate()),
    upcoming: item?.status.toLowerCase() === "upcoming" ? item?.status : "", // Default to false if no upcoming property is provided
    // upcoming: generateRandomUpcoming(), // Default to false if no upcoming property is provided
    status: item?.status,
    // status: generateRandomStatus(),
  }));
};

export const transformImmunizationData = (immunizations) => {
  return immunizations?.data?.map((item) => {
    const doses = Array.from({ length: 8 }, (_, i) => {
      const doseIndex = i + 1;
      const physicalDate = item[`dose${doseIndex}PhysicalDate`];
      const endDate = item[`dose${doseIndex}EndDate`];
      const statusId = item[`dose${doseIndex}StatusId`];
      const status = item[`dose${doseIndex}Status`];

      // Exclude doses where both physicalDate and endDate are null
      if (!physicalDate && !endDate) {
        return null;
      }

      return {
        status: status,
        date: physicalDate
          ? new Date(physicalDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })
          : new Date(endDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }),
        statusId,
      };
    })
      .filter(Boolean) // Remove null doses
      .filter((dose) => dose.status !== "Not Started"); // Exclude doses with status "Not Started"

    return {
      key: item.id,
      vaccine: item.vaccineName,
      ...Object.fromEntries(doses.map((dose, i) => [`dose${i + 1}`, dose])),
    };
  });
};
