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
};
