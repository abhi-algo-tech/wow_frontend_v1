// src/services/DocumentService.js
import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

const DocumentService = {
  getAllDocuments: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.DOCUMENT.BASE);
      return response.data;
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw error;
    }
  },

  getDocument: async (documentId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.DOCUMENT.BASE}/${documentId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching document with ID ${documentId}:`, error);
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

  updateDocument: async (documentId, documentData) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.DOCUMENT.BASE}/${documentId}`,
        documentData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating document with ID ${documentId}:`, error);
      throw error;
    }
  },

  deleteDocument: async (studentId, documentId) => {
    try {
      const response = await axiosInstance.patch(
        `${API_ENDPOINTS.DOCUMENT.DELETE}?documentId=${documentId}&studentId=${studentId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting document with ID ${documentId}:`, error);
      throw error;
    }
  },

  deleteStaffDocument: async (staffId, documentId) => {
    try {
      const response = await axiosInstance.patch(
        `${API_ENDPOINTS.StaffDOCUMENT.DELETE}?documentId=${documentId}&staffId=${staffId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting  with ID ${documentId}:`, error);
      throw error;
    }
  },

  validateDocumentName: async (documentData) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.DOCUMENT.VALIDATE_NAME,
        documentData
      );
      return response.data;
    } catch (error) {
      console.error("Error validating document name:", error);
      throw error;
    }
  },
};

export default DocumentService;
