// src/services/classroomService.js
import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

const ClassroomService = {
  getClassroomsBySchool: async (schoolId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.CLASSROOM.BY_SCHOOL}/${schoolId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching classroom with ID ${schoolId}:`, error);
      throw error;
    }
  },

  getClassroom: async (classroomId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.CLASSROOM.BASE}/${classroomId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching classroom with ID ${classroomId}:`, error);
      throw error;
    }
  },

  createClassroom: async (classroomData) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.CLASSROOM.BASE,
        classroomData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating classroom:", error);
      throw error;
    }
  },

  updateClassroom: async (classroomId, classroomData) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.CLASSROOM.BASE}/${classroomId}`,
        classroomData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating classroom with ID ${classroomId}:`, error);
      throw error;
    }
  },

  deleteClassroom: async (classroomId) => {
    try {
      const response = await axiosInstance.delete(
        `${API_ENDPOINTS.CLASSROOM.BASE}/${classroomId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting classroom with ID ${classroomId}:`, error);
      throw error;
    }
  },

  validateName: async (classroomData) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.CLASSROOM.VALIDATE_NAME,
        classroomData
      );
      return response.data;
    } catch (error) {
      console.error(`Error to validate classroom:`, error);
      throw error;
    }
  },
};

export default ClassroomService;
