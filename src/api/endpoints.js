export const API_ENDPOINTS = {
  CLASSROOM: {
    BASE: "/v1/classrooms", // Base endpoint for classroom-related operations
    VALIDATE_NAME: "/v1/classrooms/validate-name", // Endpoint to validate classroom name
  },
  STUDENT: {
    BASE: "/v1/students",
    BY_CLASSROOM: "/v1/students/classroom",
  },
  STAFF: {
    BASE: "/v1/staff",
    BY_CLASSROOM: "/v1/staff/classroom",
  },
  SCHOOL: {
    BASE: "/v1/school",
  },
  MASTER_LOOKUP: {
    BASE: "/v1/master-lookup",
    BY_TYPE: "/v1/master-lookup/type",
  },
  COUNTRY: {
    BASE: "/v1/countries",
  },
  STATE: {
    BASE: "/v1/states",
  },
  CITY: {
    BASE: "/v1/cities",
  },
  GUARDIAN: {
    BASE: "/v1/guardians",
    DELETE: "/v1/guardians/soft-delete-by-student",
  },
  PICKUP: {
    BASE: "/v1/student-pickups",
    DELETE: "/v1/student-pickups/soft-delete-by-student",
  },
};
