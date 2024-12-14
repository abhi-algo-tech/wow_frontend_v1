// src/hooks/useStaff.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import StaffService from "../services/staffService";
import { documentKey } from "../utils/queryKeys";
import { CustomMessage } from "../utils/CustomMessage";
import DocumentService from "../services/documentService";

// Fetch all staff
// export const useGetAllStaff = () => {
//   return useQuery({
//     queryKey: [documentKey.document],
//     queryFn: StaffService.getAllStaff,
//     refetchOnWindowFocus: false,
//     retry: 3,
//     onError: (error) => {
//       console.error("Error fetching staff:", error);
//     },
//   });
// };

// Fetch a single Document by ID
// export const useStaffById = (staffId) => {
//   return useQuery({
//     queryKey: [documentKey.document, staffId],
//     queryFn: () => StaffService.getStaff(staffId),
//     enabled: Boolean(staffId), // Enable query only if staffId is defined
//     onError: (error) => {
//       console.error(`Error fetching Document with ID ${staffId}:`, error);
//     },
//   });
// };

// Fetch a staff by classroom
// export const useStaffByClassroom = (classroomId) => {
//   return useQuery({
//     queryKey: [documentKey.document, classroomId],
//     queryFn: () => StaffService.getStaffByClassroom(classroomId),
//     enabled: Boolean(classroomId), // Enable query only if classroomId is defined
//     onError: (error) => {
//       console.error(
//         `Error fetching Document with classroomID ${classroomId}:`,
//         error
//       );
//     },
//   });
// };

// Create a new Document
export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (documentData) => DocumentService.createDocument(documentData),
    onSuccess: () => {
      queryClient.invalidateQueries(documentKey.document); // Refetch all staff
      CustomMessage.success("Document created successfully!"); // Success message
    },
    onError: (error) => {
      CustomMessage.error("Error creating Document!"); // Error message
      console.error("Error creating Document:", error);
    },
  });
};

// Update an existing document
export const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ documentId, documentData }) =>
      DocumentService.updateDocument(documentId, documentData),
    onSuccess: (data, { documentId }) => {
      queryClient.invalidateQueries(documentKey.document); // Refetch all documents
      queryClient.invalidateQueries({
        queryKey: [documentKey.document, documentId],
      });
      // message.success("Document updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating document:", error);
      // message.error("Failed to update the document.");
    },
  });
};

// Delete a Document
export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studentId, documentId }) =>
      DocumentService.deleteDocument(studentId, documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKey.document });
      CustomMessage.success("Document deleted successfully!"); // Success message
    },
    onError: (error) => {
      CustomMessage.error("Error deleting Document!"); // Error message
      console.error("Error deleting Document:", error);
    },
  });
};
// Delete a Document
export const useDeleteStaffDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ staffId, documentId }) =>
      DocumentService.deleteStaffDocument(staffId, documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: documentKey.document });
      CustomMessage.success("Document deleted successfully!"); // Success message
    },
    onError: (error) => {
      CustomMessage.error("Error deleting Document!"); // Error message
      console.error("Error deleting Document:", error);
    },
  });
};
