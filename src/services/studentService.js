// src/services/studentService.js
import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

const StudentService = {
  getAllStudents: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.STUDENT.BASE);
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  },

  getStudent: async (studentId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.STUDENT.BASE}/${studentId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching student with ID ${studentId}:`, error);
      throw error;
    }
  },

  getStudentByClassroom: async (classroomId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.STUDENT.BY_CLASSROOM}/${classroomId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching student with classroomID ${classroomId}:`,
        error
      );
      throw error;
    }
  },

  getStudentBySchool: async (schoolId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.STUDENT.BY_SCHOOL}/${schoolId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching student with schoolId ${schoolId}:`, error);
      throw error;
    }
  },

  createStudent: async (studentData) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.STUDENT.BASE,
        studentData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating student:", error);
      throw error;
    }
  },

  updateStudent: async (studentId, studentData) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.STUDENT.BASE}/${studentId}`,
        studentData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating student with ID ${studentId}:`, error);
      throw error;
    }
  },

  updateBatchStudents: async (studentDataList) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.STUDENT.BASE}`, // Assuming batch update endpoint is `/batch`
        studentDataList
      );
      return response.data;
    } catch (error) {
      console.error("Error updating batch of students:", error);
      throw error;
    }
  },

  deleteStudent: async (studentId) => {
    try {
      const response = await axiosInstance.delete(
        `${API_ENDPOINTS.STUDENT.BASE}/${studentId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting student with ID ${studentId}:`, error);
      throw error;
    }
  },

  createGuardian: async (guardianData) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.GUARDIAN.BASE,
        guardianData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating gaurdian:", error);
      throw error;
    }
  },

  updateGuardian: async (guardianId, guardianData) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.GUARDIAN.BASE}/${guardianId}`,
        guardianData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating gaurdian with ID ${guardianId}:`, error);
      throw error;
    }
  },

  deleteGuardian: async (guardianId, studentId) => {
    try {
      const response = await axiosInstance.patch(
        `${API_ENDPOINTS.GUARDIAN.DELETE}?guardianId=${guardianId}&studentId=${studentId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting gaurdian with ID ${guardianId} & student ID ${studentId}:`,
        error
      );
      throw error;
    }
  },

  createPickup: async (pickupData) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.PICKUP.BASE,
        pickupData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating pickup:", error);
      throw error;
    }
  },
  updatePickup: async (pickupId, pickupData) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.PICKUP.BASE}/${pickupId}`,
        pickupData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating pickup with ID ${pickupId}:`, error);
      throw error;
    }
  },

  deletePickup: async (pickupId, studentId) => {
    try {
      const response = await axiosInstance.patch(
        `${API_ENDPOINTS.PICKUP.DELETE}?studentPickupId=${pickupId}&studentId=${studentId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting pickup with ID ${pickupId} & student ID ${studentId}:`,
        error
      );
      throw error;
    }
  },

  validateName: async (studentData) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.STUDENT.VALIDATE_NAME,
        studentData
      );
      return response.data;
    } catch (error) {
      console.error(`Error to validate student:`, error);
      throw error;
    }
  },
};

export default StudentService;
