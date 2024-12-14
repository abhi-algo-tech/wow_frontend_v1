import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SchoolService from "../services/schoolService";
import { schoolKeys } from "../utils/queryKeys";
import { message } from "antd";

// Fetch all schools
export const useGetAllSchools = () => {
  return useQuery({
    queryKey: [schoolKeys.schools],
    queryFn: SchoolService.getAllSchools,
    refetchOnWindowFocus: false,
    retry: 3,
    onError: (error) => {
      // console.error("Error fetching schools:", error);
      // CustomMessage.error("Error fetching schools!"); // Uncomment for error message
    },
  });
};

// Fetch a single school by ID
export const useSchoolById = (schoolId) => {
  return useQuery({
    queryKey: [schoolKeys.schools, schoolId],
    queryFn: () => SchoolService.getSchool(schoolId),
    enabled: Boolean(schoolId), // Enable query only if schoolId is defined
    onError: (error) => {
      console.error(`Error fetching school with ID ${schoolId}:`, error);
      // CustomMessage.error(`Error fetching school with ID ${schoolId}`); // Uncomment for error message
    },
  });
};

// Create a new school
export const useCreateSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (schoolData) => SchoolService.createSchool(schoolData),
    onSuccess: () => {
      queryClient.invalidateQueries(schoolKeys.schools); // Refetch all schools
      // CustomMessage.success("School created successfully!"); // Success message
    },
    onError: (error) => {
      // CustomMessage.error("Error creating school!"); // Uncomment for error message
      console.error("Error creating school:", error);
    },
  });
};

// Update an existing school
export const useUpdateSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ schoolId, schoolData }) =>
      SchoolService.updateSchool(schoolId, schoolData),
    onSuccess: (data, { schoolId }) => {
      // Invalidate the relevant queries
      queryClient.invalidateQueries(schoolKeys.schools); // Refetch all schools
      queryClient.invalidateQueries({
        queryKey: [schoolKeys.schools, schoolId],
      });
      // CustomMessage.success("School updated successfully!"); // Success message
    },
    onError: (error) => {
      // CustomMessage.error("Error updating school!"); // Uncomment for error message
      console.error("Error updating school:", error);
    },
  });
};

// Delete a school
export const useDeleteSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: SchoolService.deleteSchool,
    onSuccess: () => {
      queryClient.invalidateQueries(schoolKeys.schools); // Refetch all schools
      // CustomMessage.success("School deleted successfully!"); // Success message
    },
    onError: (error) => {
      // CustomMessage.error("Error deleting school!"); // Uncomment for error message
      console.error("Error deleting school:", error);
    },
  });
};
