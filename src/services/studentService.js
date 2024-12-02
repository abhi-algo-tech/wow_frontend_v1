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
};

export default StudentService;
