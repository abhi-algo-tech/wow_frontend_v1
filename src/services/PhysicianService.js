import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

const PhysicianService = {
  getAllPhysicians: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.PHYSICIAN.BASE);
      return response.data;
    } catch (error) {
      console.error("Error fetching physicians:", error);
      throw error;
    }
  },

  getPhysician: async (physicianId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.PHYSICIAN.BASE}/${physicianId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching physician with ID ${physicianId}:`, error);
      throw error;
    }
  },

  getPhysiciansByStudent: async (studentId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.PHYSICIAN.GET_BY_STUDENT}/${studentId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching physicians for student ID ${studentId}:`,
        error
      );
      throw error;
    }
  },

  createPhysician: async (physicianData) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.PHYSICIAN.BASE,
        physicianData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating physician:", error);
      throw error;
    }
  },

  updatePhysician: async (physicianId, physicianData) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.PHYSICIAN.BASE}/${physicianId}`,
        physicianData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating physician with ID ${physicianId}:`, error);
      throw error;
    }
  },

  deletePhysician: async (physicianId) => {
    try {
      const response = await axiosInstance.delete(
        `${API_ENDPOINTS.PHYSICIAN.BASE}/${physicianId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting physician with ID ${physicianId}:`, error);
      throw error;
    }
  },
};

export default PhysicianService;
