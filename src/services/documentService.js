// src/services/DocumentService.js
import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

const DocumentService = {
  // getAllStaff: async () => {
  //   try {
  //     const response = await axiosInstance.get(API_ENDPOINTS.STAFF.BASE);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching staff members:", error);
  //     throw error;
  //   }
  // },

  // getStaffByClassroom: async (classroomId) => {
  //   try {
  //     const response = await axiosInstance.get(
  //       `${API_ENDPOINTS.STAFF.BY_CLASSROOM}/${classroomId}`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error(
  //       `Error fetching staff with classroomID ${classroomId}:`,
  //       error
  //     );
  //     throw error;
  //   }
  // },

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

  createDocument: async (documentData) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.DOCUMENT.BASE,
        documentData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating document:", error);
      throw error;
    }
  },

  updateStaff: async (staffId, documentData) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.STAFF.BASE}/${staffId}`,
        documentData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating staff member with ID ${staffId}:`, error);
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
};

export default DocumentService;
