// src/hooks/useWeekScheduleService.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { scheduleKeys } from "../utils/queryKeys";
import { message } from "antd";
import { CustomMessage } from "../utils/CustomMessage";
import WeekScheduleService from "../services/weekSchedule";

// Fetch all active week schedules
export const useGetAllActiveSchedules = () => {
  return useQuery({
    queryKey: [scheduleKeys.activeSchedules],
    queryFn: WeekScheduleService.getAllActiveSchedules,
    refetchOnWindowFocus: false,
    retry: 3,
    onError: (error) =>
      console.error("Error fetching active week schedules:", error),
  });
};

// Fetch a specific week schedule by ID
export const useWeekScheduleById = (scheduleId) => {
  return useQuery({
    queryKey: [scheduleKeys.weekSchedule, scheduleId],
    queryFn: () => WeekScheduleService.getScheduleById(scheduleId),
    enabled: Boolean(scheduleId),
    onError: (error) =>
      console.error(
        `Error fetching week schedule with ID ${scheduleId}:`,
        error
      ),
  });
};

// Create multiple week schedules
export const useCreateWeekSchedules = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (weekSchedules) =>
      WeekScheduleService.createWeekSchedules(weekSchedules),
    onSuccess: () => {
      queryClient.invalidateQueries(scheduleKeys.activeSchedules);
      //   CustomMessage.success("Week schedules created successfully!");
    },
    onError: (error) => {
      console.error("Error creating week schedules:", error);
      //   CustomMessage.error("Error creating week schedules!");
    },
  });
};

// Update multiple week schedules
export const useUpdateWeekSchedules = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (weekSchedules) =>
      WeekScheduleService.updateSchedules(weekSchedules),
    onSuccess: () => {
      queryClient.invalidateQueries(scheduleKeys.activeSchedules);
      //   CustomMessage.success("Week schedules updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating week schedules:", error);
      //   CustomMessage.error("Error updating week schedules!");
    },
  });
};

// Delete a week schedule
export const useDeleteWeekSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (scheduleId) => WeekScheduleService.deleteSchedule(scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries(scheduleKeys.activeSchedules);
      CustomMessage.success("Week schedule deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting week schedule:", error);
      CustomMessage.error("Error deleting week schedule!");
    },
  });
};
