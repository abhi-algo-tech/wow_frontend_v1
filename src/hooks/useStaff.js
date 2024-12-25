// src/hooks/useStaff.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import StaffService from "../services/staffService";
import { staffKeys } from "../utils/queryKeys";
import { CustomMessage } from "../utils/CustomMessage";
import { useState } from "react";

// Fetch all staff
export const useGetAllStaff = () => {
  return useQuery({
    queryKey: [staffKeys.staff],
    queryFn: StaffService.getAllStaff,
    refetchOnWindowFocus: false,
    retry: 3,
    onError: (error) => {
      console.error("Error fetching staff:", error);
    },
  });
};

// Fetch a single staff member by ID
export const useStaffById = (staffId) => {
  return useQuery({
    queryKey: [staffKeys.staff, staffId],
    queryFn: () => StaffService.getStaff(staffId),
    enabled: Boolean(staffId), // Enable query only if staffId is defined
    onError: (error) => {
      console.error(`Error fetching staff member with ID ${staffId}:`, error);
    },
  });
};

// Fetch a staff by classroom
export const useStaffByClassroom = (classroomId) => {
  return useQuery({
    queryKey: [staffKeys.staff, classroomId],
    queryFn: () => StaffService.getStaffByClassroom(classroomId),
    enabled: Boolean(classroomId), // Enable query only if classroomId is defined
    onError: (error) => {
      console.error(
        `Error fetching staff member with classroomID ${classroomId}:`,
        error
      );
    },
  });
};

// Create a new staff member
export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (staffData) => StaffService.createStaff(staffData),
    onSuccess: () => {
      queryClient.invalidateQueries(staffKeys.staff); // Refetch all staff
      // CustomMessage.success("Staff member created successfully!"); // Success message
    },
    onError: (error) => {
      // CustomMessage.error("Error creating staff member!"); // Error message
      console.error("Error creating staff member:", error);
    },
  });
};

// Update an existing staff member
export const useUpdateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ staffId, staffData }) =>
      StaffService.updateStaff(staffId, staffData),
    onSuccess: (data, { staffId }) => {
      // Invalidate the relevant queries
      queryClient.invalidateQueries(staffKeys.staff); // Refetch all staff
      queryClient.invalidateQueries({
        queryKey: [staffKeys.staff, staffId],
      });
      // CustomMessage.success("Staff member updated successfully!"); // Success message
    },
    onError: (error) => {
      // CustomMessage.error("Error updating staff member!"); // Error message
      console.error("Error updating staff member:", error);
    },
  });
};

export const useBatchUpdateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => StaffService.updateBatchStaff(payload), // Use the service method for batch update
    onSuccess: (data, { staffIds, classroomId }) => {
      // Invalidate the relevant queries to refetch the data
      queryClient.invalidateQueries(staffKeys.staff); // Refetch all staff
      // queryClient.invalidateQueries({
      //   queryKey: [staffKeys.staff, ...staffIds], // Refetch specific staff based on their ids
      // });
      CustomMessage.success(
        `Classroom updated for staff ${staffIds.join(", ")} successfully!`
      ); // Optional success message
    },
    onError: (error) => {
      CustomMessage.error("Error updating batch of staff!"); // Optional error message
      console.error("Error updating batch of staff:", error);
    },
  });
};

// Delete a staff member
export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: StaffService.deleteStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffKeys.staff });
      CustomMessage.success("Staff member deleted successfully!"); // Success message
    },
    onError: (error) => {
      CustomMessage.error("Error deleting staff member!"); // Error message
      console.error("Error deleting staff member:", error);
    },
  });
};

export const useValidateStaff = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationMessage, setValidationMessage] = useState(null);

  const validate = async (firstName, lastName, id) => {
    setIsLoading(true);
    setError(null);
    setValidationMessage(null);

    try {
      const result = await StaffService.validateName({
        firstName: firstName,
        lastName: lastName,
        id: id,
      });
      setValidationMessage(result); // Success message from backend
    } catch (err) {
      setError(err.message); // Error message from backend
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    validationMessage, // Updated variable name
    validate,
  };
};
