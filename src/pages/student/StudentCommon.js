const colorMap = {
    blue: "#0000FF",
    green: "#008000",
    purple: "#800080",
    yellow: "#FDCD16",
    pink: "#FFC0CB",
    red: "#FF0000",
  };
  
  const generateRandomHexColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
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

export const generateStudentData = (apiData) => {
    return apiData.map((item, index) => ({
      key: item.id,
      name: item.firstName + " " + item.lastName,
      avatar: item.profileUrl
        ? item.profileUrl
        : generateColorForStudent(item.firstName , item.lastName), // Use the student's name to generate a color if no avatar URL is available
        classroom: { name: "1-Blue-D", color: "blue" },
      tags: { days: 3, type: "Full Day" },
      schedule: {
        days: ["Mon", "Tue", "Wed", "Thu", "Fri"], 
        active: ["Mon", "Wed", "Fri"],
      },
      birthdate: item.birthdate,
      movementDate: item.movementDate,
      upcoming: item.upcoming || false, // Default to false if no upcoming property is provided
    }));
  };
  