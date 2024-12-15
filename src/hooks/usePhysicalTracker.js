// src/hooks/usePhysicalTrackerService.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { physicalTrackerKeys } from "../utils/queryKeys";
import PhysicalTrackerService from "../services/PhysicalTrackerService";
import { CustomMessage } from "../utils/CustomMessage";

// Fetch all physical trackers
export const useGetAllPhysicalTrackers = () => {
  return useQuery({
    queryKey: [physicalTrackerKeys.trackers],
    queryFn: PhysicalTrackerService.getAllPhysicalTrackers,
    refetchOnWindowFocus: false,
    retry: 3,
    onError: (error) =>
      console.error("Error fetching all physical trackers:", error),
  });
};

// Fetch all physical trackers by student
export const useGetAllPhysicalTrackersByStudent = (studentId) => {
  return useQuery({
    queryKey: [physicalTrackerKeys.trackers, "byStudent", studentId],
    queryFn: () =>
      PhysicalTrackerService.getPhysicalTrackersByStudent(studentId),
    enabled: Boolean(studentId),
    refetchOnWindowFocus: false,
    retry: 3,
    onError: (error) =>
      console.error(
        `Error fetching physical trackers for student ID ${studentId}:`,
        error
      ),
  });
};

// Fetch all physical trackers by staff
export const useGetAllPhysicalTrackersByStaff = (staffId) => {
  return useQuery({
    queryKey: [physicalTrackerKeys.trackers, "byStaff", staffId],
    queryFn: () => PhysicalTrackerService.getPhysicalTrackersByStaff(staffId),
    enabled: Boolean(staffId),
    refetchOnWindowFocus: false,
    retry: 3,
    onError: (error) =>
      console.error(
        `Error fetching physical trackers for staff ID ${staffId}:`,
        error
      ),
  });
};

// Fetch a single physical tracker by ID
export const usePhysicalTrackerById = (trackerId) => {
  return useQuery({
    queryKey: [physicalTrackerKeys.trackers, trackerId],
    queryFn: () => PhysicalTrackerService.getPhysicalTracker(trackerId),
    enabled: Boolean(trackerId),
    refetchOnWindowFocus: false,
    onError: (error) =>
      console.error(
        `Error fetching physical tracker with ID ${trackerId}:`,
        error
      ),
  });
};

// Create a new physical tracker
export const useCreatePhysicalTracker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (trackerData) =>
      PhysicalTrackerService.createPhysicalTracker(trackerData),
    onSuccess: () => {
      queryClient.invalidateQueries(physicalTrackerKeys.trackers);
      // CustomMessage.success("Physical tracker created successfully!");
    },
    onError: (error) => {
      console.error("Error creating physical tracker:", error);
      // CustomMessage.error("Error creating physical tracker!");
    },
  });
};

// Update an existing physical tracker
export const useUpdatePhysicalTracker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ trackerId, trackerData }) =>
      PhysicalTrackerService.updatePhysicalTracker(trackerId, trackerData),
    onSuccess: () => {
      queryClient.invalidateQueries(physicalTrackerKeys.trackers);
      // CustomMessage.success("Physical tracker updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating physical tracker:", error);
      // CustomMessage.error("Error updating physical tracker!");
    },
  });
};

// Delete a physical tracker
export const useDeletePhysicalTracker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (trackerId) =>
      PhysicalTrackerService.deletePhysicalTracker(trackerId),
    onSuccess: () => {
      queryClient.invalidateQueries(physicalTrackerKeys.trackers);
      // CustomMessage.success("Physical tracker deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting physical tracker:", error);
      // CustomMessage.error("Error deleting physical tracker!");
    },
  });
};
