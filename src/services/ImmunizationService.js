import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

const ImmunizationService = {
  getAllImmunizations: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.IMMUNIZATION.BASE);
      return response.data;
    } catch (error) {
      console.error("Error fetching immunizations:", error);
      throw error;
    }
  },

  getImmunization: async (immunizationId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.IMMUNIZATION.BASE}/${immunizationId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching immunization with ID ${immunizationId}:`,
        error
      );
      throw error;
    }
  },

  getImmunizationsByStudent: async (studentId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.IMMUNIZATION.GET_BY_STUDENT}/${studentId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching immunizations for student ID ${studentId}:`,
        error
      );
      throw error;
    }
  },

  createImmunization: async (immunizationData) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.IMMUNIZATION.BASE,
        immunizationData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating immunization:", error);
      throw error;
    }
  },

  updateImmunization: async (immunizationId, immunizationData) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.IMMUNIZATION.BASE}/${immunizationId}`,
        immunizationData
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error updating immunization with ID ${immunizationId}:`,
        error
      );
      throw error;
    }
  },

  deleteImmunization: async (immunizationId) => {
    try {
      const response = await axiosInstance.delete(
        `${API_ENDPOINTS.IMMUNIZATION.BASE}/${immunizationId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting immunization with ID ${immunizationId}:`,
        error
      );
      throw error;
    }
  },
};

export default ImmunizationService;
