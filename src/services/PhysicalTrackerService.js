import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

const PhysicalTrackerService = {
  getAllPhysicalTrackers: async () => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.PHYSICAL_TRACKER.BASE
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching physical trackers:", error);
      throw error;
    }
  },

  getPhysicalTracker: async (trackerId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.PHYSICAL_TRACKER.BASE}/${trackerId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching physical tracker with ID ${trackerId}:`,
        error
      );
      throw error;
    }
  },

  getPhysicalTrackersByStudent: async (studentId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.PHYSICAL_TRACKER.GET_BY_STUDENT}/${studentId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching physical trackers for student ID ${studentId}:`,
        error
      );
      throw error;
    }
  },

  getPhysicalTrackersByStaff: async (staffId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.PHYSICAL_TRACKER.GET_BY_STAFF}/${staffId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching physical trackers for staff ID ${staffId}:`,
        error
      );
      throw error;
    }
  },

  createPhysicalTracker: async (trackerData) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.PHYSICAL_TRACKER.BASE,
        trackerData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating physical tracker:", error);
      throw error;
    }
  },

  updatePhysicalTracker: async (trackerId, trackerData) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.PHYSICAL_TRACKER.BASE}/${trackerId}`,
        trackerData
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error updating physical tracker with ID ${trackerId}:`,
        error
      );
      throw error;
    }
  },

  deletePhysicalTracker: async (trackerId) => {
    try {
      const response = await axiosInstance.delete(
        `${API_ENDPOINTS.PHYSICAL_TRACKER.BASE}/${trackerId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting physical tracker with ID ${trackerId}:`,
        error
      );
      throw error;
    }
  },
};

export default PhysicalTrackerService;
