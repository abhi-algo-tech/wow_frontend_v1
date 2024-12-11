// src/hooks/usePhysicianService.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { physicianKeys } from "../utils/queryKeys";
import PhysicianService from "../services/PhysicianService";
import { CustomMessage } from "../utils/CustomMessage";

// Fetch all physicians
export const useGetAllPhysicians = () => {
  return useQuery({
    queryKey: [physicianKeys.physicians],
    queryFn: PhysicianService.getAllPhysicians,
    refetchOnWindowFocus: false,
    retry: 3,
    onError: (error) => console.error("Error fetching all physicians:", error),
  });
};

// Fetch all physicians by student
export const useGetAllPhysiciansByStudent = (studentId) => {
  return useQuery({
    queryKey: [physicianKeys.physicians, "byStudent", studentId],
    queryFn: () => PhysicianService.getPhysiciansByStudent(studentId), // Wrap with an arrow function
    enabled: Boolean(studentId), // Ensures query runs only when a valid `studentId` is passed
    refetchOnWindowFocus: false,
    retry: 3,
    onError: (error) =>
      console.error(
        `Error fetching physicians by student with ID ${studentId}:`,
        error
      ),
  });
};

// Fetch a single physician by ID
export const usePhysicianById = (physicianId) => {
  return useQuery({
    queryKey: [physicianKeys.physicians, physicianId],
    queryFn: () => PhysicianService.getPhysician(physicianId),
    enabled: Boolean(physicianId),
    refetchOnWindowFocus: false,
    onError: (error) =>
      console.error(`Error fetching physician by ID ${physicianId}:`, error),
  });
};

// Create a new physician
export const useCreatePhysician = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (physicianData) =>
      PhysicianService.createPhysician(physicianData),
    onSuccess: () => {
      queryClient.invalidateQueries(physicianKeys.physicians);
      // CustomMessage.success("Physician created successfully!");
    },
    onError: (error) => {
      console.error("Error creating physician:", error);
      // CustomMessage.error("Error creating physician!");
    },
  });
};

// Update an existing physician
export const useUpdatePhysician = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ physicianId, physicianData }) =>
      PhysicianService.updatePhysician(physicianId, physicianData),
    onSuccess: () => {
      queryClient.invalidateQueries(physicianKeys.physicians);
      // CustomMessage.success("Physician updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating physician:", error);
      // CustomMessage.error("Error updating physician!");
    },
  });
};

// Delete a physician
export const useDeletePhysician = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (physicianId) => PhysicianService.deletePhysician(physicianId),
    onSuccess: () => {
      queryClient.invalidateQueries(physicianKeys.physicians);
      // CustomMessage.success("Physician deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting physician:", error);
      // CustomMessage.error("Error deleting physician!");
    },
  });
};
