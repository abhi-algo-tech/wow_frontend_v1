// src/services/staffService.js
import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

const StaffService = {
  getAllStaff: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.STAFF.BASE);
      return response.data;
    } catch (error) {
      console.error("Error fetching staff members:", error);
      throw error;
    }
  },

  getStaffByClassroom: async (classroomId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.STAFF.BY_CLASSROOM}/${classroomId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching staff with classroomID ${classroomId}:`,
        error
      );
      throw error;
    }
  },

  getStaff: async (staffId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.STAFF.BASE}/${staffId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching staff member with ID ${staffId}:`, error);
      throw error;
    }
  },

  createStaff: async (staffData) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.STAFF.BASE,
        staffData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating staff member:", error);
      throw error;
    }
  },

  updateStaff: async (staffId, staffData) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.STAFF.BASE}/${staffId}`,
        staffData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating staff member with ID ${staffId}:`, error);
      throw error;
    }
  },

  updateBatchStaff: async (staffData) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.STAFF.BASE}`, // Assuming batch update endpoint is `/batch`
        staffData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating batch of staff:", error);
      throw error;
    }
  },

  deleteStaff: async (staffId) => {
    try {
      const response = await axiosInstance.delete(
        `${API_ENDPOINTS.STAFF.BASE}/${staffId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting staff member with ID ${staffId}:`, error);
      throw error;
    }
  },

  validateName: async (staffData) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.STAFF.VALIDATE_NAME,
        staffData
      );
      return response.data;
    } catch (error) {
      console.error(`Error to validate staff:`, error);
      throw error;
    }
  },
};

export default StaffService;
