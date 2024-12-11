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

// Update an existing Document
export const useUpdateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ staffId, documentData }) =>
      StaffService.updateStaff(staffId, documentData),
    onSuccess: (data, { staffId }) => {
      // Invalidate the relevant queries
      queryClient.invalidateQueries(documentKey.document); // Refetch all staff
      queryClient.invalidateQueries({
        queryKey: [documentKey.document, staffId],
      });
      // CustomMessage.success("Document updated successfully!"); // Success message
    },
    onError: (error) => {
      // CustomMessage.error("Error updating Document!"); // Error message
      console.error("Error updating Document:", error);
    },
  });
};

// Delete a Document
export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: StaffService.deleteStaff,
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
