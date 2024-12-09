export const formatStudentData = (studentData) => {
  return studentData.data.map((student) => {
    const flags = [];
    const flagValues = {};

    // Check for notes
    if (student.note) {
      flags.push("Notes");
      flagValues["Notes"] = student.note;
    }

    // Check for allergies
    if (
      student.allergies &&
      student.allergies.toLowerCase() !== "no allergies"
    ) {
      flags.push("Allergies");
      flagValues["Allergies"] = student.allergies;
    }

    // Check for dietary restrictions
    if (
      student.dietRestriction &&
      student.dietRestriction.toLowerCase() !== "no diet restrictions" &&
      student.dietRestriction.toLowerCase() !== "no restriction"
    ) {
      flags.push("Dietary-Restrictions");
      flagValues["Dietary-Restrictions"] = student.dietRestriction;
    }

    // Check for medication
    if (
      student.medications &&
      student.medications.toLowerCase() !== "no medications"
    ) {
      flags.push("Medication");
      flagValues["Medication"] = student.medications;
    }

    // Check if photo is available
    // if (!student.profileUrl || student.profileUrl.trim() === "") {
    //   flags.push("no-photo");
    //   flagValues["no-photo"] = "Profile photo not available";
    // }

    return {
      id: student.id,
      name: `${student.firstName || ""} ${student.lastName || ""}`.trim(),
      avatar: student.profileUrl || null,
      flags: flags,
      flagValues: flagValues,
      status: student.status || "",
    };
  });
};

export const formatStaffData = (staffData) => {
  return staffData.data.map((staff) => {
    const flags = [];
    const flagValues = {};

    // Check if email is available
    if (staff.email) {
      flags.push("mail");
      flagValues["mail"] = staff.email;
    }

    // Check for phone number
    // if (staff.phoneNumber) {
    //   flags.push("Phone");
    //   flagValues["Phone"] = staff.phoneNumber;
    // }

    // Return formatted staff data
    return {
      id: staff.id,
      name: `${staff.firstName || ""} ${staff.lastName || ""}`.trim(),
      avatar: staff.profileUrl || null,
      flags: flags,
      flagValues: flagValues,
      status: staff.status || "",
      designation: staff.designation || "",
    };
  });
};

export const formatStudentDataForCard = (studentData) => {
  const student = studentData.data;

  const flags = [];

  // Check for notes
  if (student.note) {
    flags.push({ flag: "Notes", flagValue: student.note });
  }

  // Check for allergies
  if (student.allergies && student.allergies.toLowerCase() !== "no allergies") {
    flags.push({ flag: "Allergies", flagValue: student.allergies });
  }

  // Check for dietary restrictions
  if (
    student.dietRestriction &&
    student.dietRestriction.toLowerCase() !== "no diet restrictions" &&
    student.dietRestriction.toLowerCase() !== "no restriction"
  ) {
    flags.push({
      flag: "Dietary-Restrictions",
      flagValue: student.dietRestriction,
    });
  }

  // Check for medication
  if (
    student.medications &&
    student.medications.toLowerCase() !== "no medications"
  ) {
    flags.push({ flag: "Medication", flagValue: student.medications });
  }

  // Check if photo is available
  // if (!student.profileUrl || student.profileUrl.trim() === "") {
  //   flags.push({ flag: "no-photo", flagValue: "Profile photo not available" });
  // }

  return flags; // Return an array of objects with flag and flagValue
};
