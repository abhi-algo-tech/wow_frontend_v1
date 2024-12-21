import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

const WeekScheduleService = {
  // Create multiple week schedules
  createWeekSchedules: async (weekSchedules) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.WEEK_SCHEDULE.BASE,
        weekSchedules
      );
      return response.data;
    } catch (error) {
      console.error("Error creating week schedules:", error);
      throw error;
    }
  },

  // Retrieve a specific week schedule by ID
  getScheduleById: async (id) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.WEEK_SCHEDULE.BASE}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching week schedule with ID ${id}:`, error);
      throw error;
    }
  },

  // Retrieve all active week schedules
  getAllActiveSchedules: async () => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.WEEK_SCHEDULE.BASE
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching active week schedules:", error);
      throw error;
    }
  },

  // Update multiple week schedules
  updateSchedules: async (weekSchedules) => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.WEEK_SCHEDULE.BASE,
        weekSchedules
      );
      return response.data;
    } catch (error) {
      console.error("Error updating week schedules:", error);
      throw error;
    }
  },

  // Soft delete a week schedule by ID
  deleteSchedule: async (id) => {
    try {
      const response = await axiosInstance.delete(
        `${API_ENDPOINTS.WEEK_SCHEDULE.BASE}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting week schedule with ID ${id}:`, error);
      throw error;
    }
  },
};

export default WeekScheduleService;
