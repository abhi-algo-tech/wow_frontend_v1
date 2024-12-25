// src/hooks/useImmunizationService.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { immunizationKeys } from "../utils/queryKeys";
import ImmunizationService from "../services/ImmunizationService";
import { CustomMessage } from "../utils/CustomMessage";

// Fetch all immunizations
export const useGetAllImmunizations = () => {
  return useQuery({
    queryKey: [immunizationKeys.immunizations],
    queryFn: ImmunizationService.getAllImmunizations,
    refetchOnWindowFocus: false,
    retry: 3,
    onError: (error) =>
      console.error("Error fetching all immunizations:", error),
  });
};

// Fetch all immunizations by student
export const useGetAllImmunizationsByStudent = (studentId) => {
  return useQuery({
    queryKey: [immunizationKeys.immunizations, "byStudent", studentId],
    queryFn: () => ImmunizationService.getImmunizationsByStudent(studentId),
    enabled: Boolean(studentId),
    refetchOnWindowFocus: false,
    retry: 3,
    onError: (error) =>
      console.error(
        `Error fetching immunizations by student with ID ${studentId}:`,
        error
      ),
  });
};

// Fetch a single immunization by ID
export const useImmunizationById = (immunizationId) => {
  return useQuery({
    queryKey: [immunizationKeys.immunizations, immunizationId],
    queryFn: () => ImmunizationService.getImmunization(immunizationId),
    enabled: Boolean(immunizationId),
    refetchOnWindowFocus: false,
    onError: (error) =>
      console.error(
        `Error fetching immunization by ID ${immunizationId}:`,
        error
      ),
  });
};

// Create a new immunization
export const useCreateImmunization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (immunizationData) =>
      ImmunizationService.createImmunization(immunizationData),
    onSuccess: () => {
      queryClient.invalidateQueries(immunizationKeys.immunizations);
      // CustomMessage.success("Immunization created successfully!");
    },
    onError: (error) => {
      console.error("Error creating immunization:", error);
      // CustomMessage.error("Error creating immunization!");
    },
  });
};

// Update an existing immunization
export const useUpdateImmunization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ immunizationId, immunizationData }) =>
      ImmunizationService.updateImmunization(immunizationId, immunizationData),
    onSuccess: () => {
      queryClient.invalidateQueries(immunizationKeys.immunizations);
      // CustomMessage.success("Immunization updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating immunization:", error);
      // CustomMessage.error("Error updating immunization!");
    },
  });
};

// Delete an immunization
export const useDeleteImmunization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (immunizationId) =>
      ImmunizationService.deleteImmunization(immunizationId),
    onSuccess: () => {
      queryClient.invalidateQueries(immunizationKeys.immunizations);
      // CustomMessage.success("Immunization deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting immunization:", error);
      // CustomMessage.error("Error deleting immunization!");
    },
  });
};
