// src/hooks/useStudentService.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import StudentService from "../services/studentService";
import {
  guardianKeys,
  studentKeys,
  studentPickupsKey,
} from "../utils/queryKeys";
import { message } from "antd";
import { useState } from "react";
import { CustomMessage } from "../utils/CustomMessage";

// Fetch all students
export const useGetAllStudents = () => {
  return useQuery({
    queryKey: [studentKeys.students],
    queryFn: StudentService.getAllStudents,
    refetchOnWindowFocus: false,
    retry: 3,
    onError: (error) => {
      console.error("Error fetching students:", error);
    },
  });
};

// Fetch a single student by ID
export const useStudentById = (studentId) => {
  return useQuery({
    queryKey: [studentKeys.students, studentId],
    queryFn: () => StudentService.getStudent(studentId),
    enabled: Boolean(studentId), // Enable query only if studentId is defined
    onError: (error) => {
      console.error(`Error fetching student with ID ${studentId}:`, error);
    },
  });
};

// Fetch a student by classroom
export const useStudentByClassroom = (classroomId) => {
  return useQuery({
    queryKey: [studentKeys.students, classroomId],
    queryFn: () => StudentService.getStudentByClassroom(classroomId),
    enabled: Boolean(classroomId), // Enable query only if classroomId is defined
    onError: (error) => {
      console.error(
        `Error fetching student with classroomID ${classroomId}:`,
        error
      );
    },
  });
};

// Fetch a student by school
export const useStudentBySchool = (schoolId) => {
  return useQuery({
    queryKey: [studentKeys.students, schoolId],
    queryFn: () => StudentService.getStudentBySchool(schoolId),
    enabled: Boolean(schoolId), // Enable query only if schoolId is defined
    onError: (error) => {
      console.error(`Error fetching student with schoolId ${schoolId}:`, error);
    },
  });
};

export const useValidateStudent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationMessage, setValidationMessage] = useState(null);

  const validate = async (firstName, lastName, classroomId, id) => {
    setIsLoading(true);
    setError(null);
    setValidationMessage(null);

    try {
      const result = await StudentService.validateName({
        firstName: firstName,
        lastName: lastName,
        classroomId: classroomId,
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

// Create a new student
export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (studentData) => StudentService.createStudent(studentData),
    onSuccess: () => {
      queryClient.invalidateQueries(studentKeys.students); // Refetch all students
      // CustomMessage.success("Student created successfully!"); // Success message
    },
    onError: (error) => {
      // CustomMessage.error("Error creating student!"); // Error message
      console.error("Error creating student:", error);
    },
  });
};

// Update an existing student
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studentId, studentData }) =>
      StudentService.updateStudent(studentId, studentData),

    onSuccess: (data, { studentId }) => {
      // Invalidate the relevant queries
      queryClient.invalidateQueries(studentKeys.students); // Refetch all students
      // queryClient.invalidateQueries({
      //   queryKey: [studentKeys.students, studentId],
      // });
      // CustomMessage.success("Student updated successfully!"); // Success message
    },

    //   onError: (error) => {
    //     CustomMessage.error("Error updating student!"); // Error message
    //     console.error("Error updating student:", error);
    //   },
  });
};
export const useBatchUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studentData }) =>
      StudentService.updateBatchStudents(studentData), // Pass the studentData to the batch update service

    onSuccess: (data) => {
      // Invalidate the relevant queries after successful mutation
      queryClient.invalidateQueries(studentKeys.students); // Refetch all students to reflect updates

      // Show a success message
      CustomMessage.success("Students updated successfully!");
    },

    onError: (error) => {
      // Handle error scenarios with an appropriate message
      CustomMessage.error("Error updating students. Please try again.");
      console.error("Error updating students:", error);
    },
  });
};

// Delete a student
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: StudentService.deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.students });
      // CustomMessage.success("Student deleted successfully!"); // Success message
    },
    onError: (error) => {
      // CustomMessage.error("Error deleting student!"); // Error message
      console.error("Error deleting student:", error);
    },
  });
};

// Create a new gauradian
export const useCreateGuardian = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (guardianData) => StudentService.createGuardian(guardianData),
    onSuccess: () => {
      queryClient.invalidateQueries(guardianKeys.guardians); // Refetch all guardians
      // CustomMessage.success("Gaurdian created successfully!"); // Success message
    },
    onError: (error) => {
      // CustomMessage.error("Error creating gaurdian!"); // Error message
      console.error("Error creating gaurdian:", error);
    },
  });
};

// Update an existing student
export const useUpdateGuardian = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ guardianId, guardianData }) =>
      StudentService.updateGuardian(guardianId, guardianData),
    onSuccess: (data, { guardianId }) => {
      // Invalidate the relevant queries
      queryClient.invalidateQueries(guardianKeys.guardians); // Refetch all guardians
      queryClient.invalidateQueries({
        queryKey: [guardianKeys.guardians, guardianId],
      });
      // CustomMessage.success("Gaurdian updated successfully!"); // Success message
      // CustomMessage.success("Student updated successfully!"); // Success message
    },
  });
};

// Delete a student
export const useDeleteGuardian = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ guardianId, studentId }) =>
      StudentService.deleteGuardian(guardianId, studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: guardianKeys.guardians });
      // CustomMessage.success("gaurdian deleted successfully!"); // Success message
    },
    onError: (error) => {
      // CustomMessage.error("Error deleting gaurdian!"); // Error message
      console.error("Error deleting gaurdian:", error);
    },
  });
};

// Create a new Pickup
export const useCreatePickup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pickupData) => StudentService.createPickup(pickupData),
    onSuccess: () => {
      queryClient.invalidateQueries(studentPickupsKey.studentPickup); // Refetch all pickup
      // CustomMessage.success("Pickup created successfully!"); // Success message
    },
    onError: (error) => {
      // CustomMessage.error("Error creating pickup!"); // Error message
      console.error("Error creating pickup:", error);
    },
  });
};

// Update an existing student
export const useUpdatePickup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pickupId, pickupData }) =>
      StudentService.updatePickup(pickupId, pickupData),
    onSuccess: (data, { pickupId }) => {
      // Invalidate the relevant queries
      queryClient.invalidateQueries(studentPickupsKey.studentPickup); // Refetch all studentPickup
      queryClient.invalidateQueries({
        queryKey: [studentPickupsKey.studentPickup, pickupId],
      });
    },
  });
};

// Delete a pickup
export const useDeletePickup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pickupId, studentId }) =>
      StudentService.deletePickup(pickupId, studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: studentPickupsKey.studentPickup,
      });
      // CustomMessage.success("Pickup deleted successfully!"); // Success message
    },
    onError: (error) => {
      // CustomMessage.error("Error deleting pickup!"); // Error message
    },
  });
};
