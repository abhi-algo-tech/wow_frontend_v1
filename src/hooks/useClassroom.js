// src/hooks/useClassroomService.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ClassroomService from "../services/classroomService";
import { classRoomKeys } from "../utils/queryKeys";
import { useState } from "react";
import { CustomMessage } from "../utils/CustomMessage";

// Fetch all classrooms
export const useGetClassroomsBySchool = (schoolId) => {
  return useQuery({
    queryKey: [classRoomKeys.classrooms, schoolId],
    queryFn: () => ClassroomService.getClassroomsBySchool(schoolId),
    enabled: Boolean(schoolId),
    refetchOnWindowFocus: false,
    retry: 3,
    onError: (error) => {
      console.error(`Error fetching classroom with ID ${schoolId}:`, error);
    },
  });
};

// Fetch a single classroom by ID
export const useClassroomById = (classroomId) => {
  return useQuery({
    queryKey: [classRoomKeys.classrooms, classroomId],
    queryFn: () => ClassroomService.getClassroom(classroomId),
    enabled: Boolean(classroomId), // Enable query only if classroomId is defined
    onError: (error) => {
      console.error(`Error fetching classroom with ID ${classroomId}:`, error);
    },
  });
};

// Create a new classroom
export const useCreateClassroom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (classroomData) =>
      ClassroomService.createClassroom(classroomData),
    onSuccess: () => {
      queryClient.invalidateQueries(classRoomKeys.classrooms); // Refetch all classrooms
      // CustomMessage.success("Classroom created successfully!"); // Success message
    },
    onError: (error) => {
      // CustomMessage.error("Error creating classroom!"); // Error message
      console.error("Error creating classroom:", error);
    },
  });
};

// Update an existing classroom
export const useUpdateClassroom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classroomId, classroomData }) =>
      ClassroomService.updateClassroom(classroomId, classroomData),

    onSuccess: (data, { classroomId }) => {
      // Invalidate the relevant queries
      queryClient.invalidateQueries(classRoomKeys.classrooms); // Refetch all classrooms
      queryClient.invalidateQueries({
        queryKey: [classRoomKeys.classrooms, classroomId],
      });
      // CustomMessage.success("Classroom updated successfully!"); // Success message
      queryClient.invalidateQueries({ queryKey: classRoomKeys.classrooms }); // Refresh list after creation
    },

    onError: (error) => {
      // CustomMessage.error("Error update classroom!"); // Error message
      console.error("Error update classroom:", error);
    },
  });
};

// Delete a classroom
export const useDeleteClassroom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ClassroomService.deleteClassroom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: classRoomKeys.classrooms });
    },
    onError: (error) => {
      console.error("Error deleting classroom:", error);
    },
  });
};
export const useValidateClassroom = () => {
  const [error, setError] = useState(null);

  const validate = async (name, id) => {
    try {
      const result = await ClassroomService.validateName({
        name: name,
        id: id,
      });
      return result; // Success message from backend
    } catch (err) {
      setError(err.message); // Capture and set error message
      return null; // Return null or handle this case in your code
    }
  };

  return { validate, error };
};
