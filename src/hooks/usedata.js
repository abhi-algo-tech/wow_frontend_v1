export const generateAttendanceDailyRecords = (count) => {
  const names = [
    "Lex Fenwick",
    "Ajay Rathod",
    "Sanjai Rajendran",
    "Gaurav Kandpal",
    "Neha Sharma",
  ];
  const rooms = ["1-Blue-D", "2-Red-C", "3-Green-B"];
  const times = ["8:45 AM", "8:46 AM", "8:47 AM", "9:00 AM", "9:15 AM"];
  const attendedTimes = [
    "7 Hrs 48 Mins",
    "8 Hrs 40 Mins",
    "6 Hrs 30 Mins",
    "5 Hrs 20 Mins",
    "9 Hrs",
  ];

  return Array.from({ length: count }, (_, index) => {
    const randomName = names[index % names.length];
    const randomRoom = rooms[index % rooms.length];
    const randomTime = times[index % times.length];
    const attendedTime = attendedTimes[index % attendedTimes.length];

    return {
      key: (index + 1).toString(),
      name: randomName,
      avatar: "/placeholder.svg?height=32&width=32",
      signInRoom: randomRoom,
      signedInTime: randomTime,
      signedInBy: randomName,
      signedOutTime: randomTime,
      signedOutBy: randomName,
      attendedTime: attendedTime,
    };
  });
};

export const generateAttendanceMonthlyRecords = (count) => {
  const names = [
    "Lex Fenwick",
    "Ajay Rathod",
    "Lisa Raymond",
    "Neha Sharma",
    "Sanjai Rajendran",
    "Gaurav Kandpal",
  ];
  const rooms = ["1-Blue-D", "2-Red-C", "3-Green-B", "4-Yellow-A"];
  const hours = [
    "133 Hrs 22 Mins",
    "137 Hrs 14 Mins",
    "120 Hrs 30 Mins",
    "140 Hrs 50 Mins",
    "128 Hrs 15 Mins",
  ];
  const avatars = ["/placeholder.svg?height=32&width=32"];

  return Array.from({ length: count }, (_, index) => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
    const randomHours = hours[Math.floor(Math.random() * hours.length)];
    const randomDaysAttended = Math.floor(Math.random() * 20) + 10; // Random days between 10 and 30
    const randomAttendedTime =
      Math.random() > 0.5 ? "-" : Math.floor(Math.random() * 5) + 1; // Randomly '-' or a number between 1 and 5

    return {
      key: (index + 1).toString(),
      name: randomName,
      avatar: avatars[0],
      signInRoom: randomRoom,
      daysAttended: randomDaysAttended,
      hoursAttended: randomHours,
      attendedTime: randomAttendedTime,
    };
  });
};

// Function to generate an array of daily records
export const generateAttendanceAbsentRecords = (count) => {
  const names = [
    "Lex Fenwick",
    "Ajay Rathod",
    "Lisa Raymond",
    "Neha Sharma",
    "Sanjai Rajendran",
    "Gaurav Kandpal",
  ];
  const rooms = ["1-Blue-D", "2-Red-C", "3-Green-B", "4-Yellow-A"];
  const avatars = ["/placeholder.svg?height=32&width=32"];
  const notesOptions = [
    "-",
    "Late arrival",
    "Needs assistance",
    "Absent",
    "On time",
  ];

  // Function to get a random date in 'MMM. DD' format
  function getRandomDate() {
    const months = ["Sep", "Oct", "Nov", "Dec"];
    const day = Math.floor(Math.random() * 30) + 1; // Random day between 1 and 30
    const month = months[Math.floor(Math.random() * months.length)];
    return `${month}. ${day}`;
  }

  return Array.from({ length: count }, (_, index) => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
    const randomDate = getRandomDate();
    const randomNotes =
      notesOptions[Math.floor(Math.random() * notesOptions.length)];

    return {
      key: (index + 1).toString(),
      date: randomDate,
      name: randomName,
      avatar: avatars[0],
      signInRoom: randomRoom,
      notes: randomNotes,
    };
  });
};
