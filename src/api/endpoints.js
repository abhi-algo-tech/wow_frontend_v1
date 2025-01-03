export const API_ENDPOINTS = {
  CLASSROOM: {
    BASE: "/v1/classrooms", // Base endpoint for classroom-related operations
    VALIDATE_NAME: "/v1/classrooms/validate-name", // Endpoint to validate classroom name
    BY_SCHOOL: "/v1/classrooms/schoolId", // Endpoint student by school
  },
  STUDENT: {
    BASE: "/v1/students",
    BY_CLASSROOM: "/v1/students/classroom",
    BY_SCHOOL: "/v1/students/school",
    VALIDATE_NAME: "/v1/students/validate-name",
  },
  STAFF: {
    BASE: "/v1/staff",
    BY_CLASSROOM: "/v1/staff/classroom",
    VALIDATE_NAME: "/v1/staff/validate-name",
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
  PHYSICIAN: {
    BASE: "/v1/physicians",
    GET_BY_STUDENT: "/v1/physicians/student",
  },
  PHYSICAL_TRACKER: {
    BASE: "/v1/physical-trackers",
    GET_BY_STUDENT: "/v1/physical-trackers/student",
    GET_BY_STAFF: "/v1/physical-trackers/staff",
  },
  DOCUMENT: {
    BASE: "/v1/documents",
    DELETE: "/v1/documents/soft-delete-by-student",
  },
  StaffDOCUMENT: {
    BASE: "/v1/documents",
    DELETE: "/v1/documents/soft-delete-by-staff",
  },
  WEEK_SCHEDULE: {
    BASE: "/v1/week-schedules",
    SCHEDULE: "/v1/schedule",
    GET_BY_STAFF: "/v1/week-schedules/staff",
  },
  SCHEDULE: {
    BASE: "/v1/schedule",
    PUBLISH: "/v1/schedule/publish",
    COPY_BY_CLASSROOM: "/v1/schedule/copy/classrooms",
  },
  IMMUNIZATION: {
    BASE: "/v1/immunizations",
    GET_BY_STUDENT: "/v1/immunizations/student",
  },
};
