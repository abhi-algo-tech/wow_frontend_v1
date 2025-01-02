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
};

export default ScheduleService;
