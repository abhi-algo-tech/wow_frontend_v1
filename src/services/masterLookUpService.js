// src/services/masterLookUpService.js
import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

const MasterLookUpService = {
  // Fetch all Master Lookup entries
  getAllMasterLookups: async () => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.MASTER_LOOKUP.BASE
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching master lookup entries:", error);
      throw error;
    }
  },

  // Fetch Master Lookup entries by type
  getMasterLookupsByType: async (type) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.MASTER_LOOKUP.BY_TYPE}/${type}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching master lookup entries for type ${type}:`,
        error
      );
      throw error;
    }
  },

  // Fetch a single Master Lookup entry by ID
  getMasterLookUp: async (lookUpId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.MASTER_LOOKUP.BASE}/${lookUpId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching master lookup entry with ID ${lookUpId}:`,
        error
      );
      throw error;
    }
  },

  // Create a new Master Lookup entry
  createMasterLookUp: async (lookUpData) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.MASTER_LOOKUP.BASE,
        lookUpData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating master lookup entry:", error);
      throw error;
    }
  },

  // Update a Master Lookup entry by ID
  updateMasterLookUp: async (lookUpId, lookUpData) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.MASTER_LOOKUP.BASE}/${lookUpId}`,
        lookUpData
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error updating master lookup entry with ID ${lookUpId}:`,
        error
      );
      throw error;
    }
  },

  // Delete a Master Lookup entry by ID
  deleteMasterLookUp: async (lookUpId) => {
    try {
      const response = await axiosInstance.delete(
        `${API_ENDPOINTS.MASTER_LOOKUP.BASE}/${lookUpId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting master lookup entry with ID ${lookUpId}:`,
        error
      );
      throw error;
    }
  },
};

export default MasterLookUpService;
