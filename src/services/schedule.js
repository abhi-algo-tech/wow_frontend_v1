import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

const ScheduleService = {
  publishShift: async (schoolId, untilDate) => {
    try {
      const response = await axiosInstance.post(
        `${API_ENDPOINTS.SCHEDULE.PUBLISH}?schoolId=${schoolId}&untilDate=${untilDate}`
      );
      return response.data;
    } catch (error) {
      console.error("Error publishing shift:", error);
      throw error;
    }
  },

  copyByClassroom: async (
    classroomIds,
    startWeekDate,
    endWeekDate,
    untilDate
  ) => {
    try {
      const response = await axiosInstance.post(
        `${API_ENDPOINTS.SCHEDULE.COPY_BY_CLASSROOM}`,
        null, // No request body is needed
        {
          params: {
            classroomIds: classroomIds.join(","), // Convert array to comma-separated string
            startWeekDate,
            endWeekDate,
            untilDate,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error copying shift:", error);
      throw error;
    }
  },

  getAllSchedulesByStaff: async (params) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.SCHEDULE.GET_SCHEDULE_STAFF}?startDate=${params?.startDate}&endDate=${params?.endDate}&staffId=${params?.staffId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching schedules by staff:", error);
      throw error;
    }
  },
};

export default ScheduleService;
