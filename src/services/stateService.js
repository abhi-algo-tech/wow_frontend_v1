import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

const StateService = {
  getAllStates: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.STATE.BASE);
      return response.data;
    } catch (error) {
      console.error("Error fetching states:", error);
      throw error;
    }
  },

  getState: async (stateId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.STATE.BASE}/${stateId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching state with ID ${stateId}:`, error);
      throw error;
    }
  },

  createState: async (stateData) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.STATE.BASE,
        stateData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating state:", error);
      throw error;
    }
  },

  updateState: async (stateId, stateData) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.STATE.BASE}/${stateId}`,
        stateData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating state with ID ${stateId}:`, error);
      throw error;
    }
  },

  deleteState: async (stateId) => {
    try {
      const response = await axiosInstance.delete(
        `${API_ENDPOINTS.STATE.BASE}/${stateId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting state with ID ${stateId}:`, error);
      throw error;
    }
  },
};

export default StateService;
