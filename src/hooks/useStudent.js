// src/hooks/useStudentService.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import StudentService from "../services/studentService";
import { studentKeys } from "../utils/queryKeys";
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

// Create a new student
export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (studentData) => StudentService.createStudent(studentData),
    onSuccess: () => {
      queryClient.invalidateQueries(studentKeys.students); // Refetch all students
      CustomMessage.success("Student created successfully!"); // Success message
    },
    onError: (error) => {
      CustomMessage.error("Error creating student!"); // Error message
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
      queryClient.invalidateQueries({
        queryKey: [studentKeys.students, studentId],
      });
      // message.success("Student updated successfully!"); // Success message
    },

    //   onError: (error) => {
    //     message.error("Error updating student!"); // Error message
    //     console.error("Error updating student:", error);
    //   },
  });
};

// Delete a student
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: StudentService.deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.students });
      CustomMessage.success("Student deleted successfully!"); // Success message
    },
    onError: (error) => {
      CustomMessage.error("Error deleting student!"); // Error message
      console.error("Error deleting student:", error);
    },
  });
};
