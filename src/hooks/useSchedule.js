import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { scheduleKeys } from "../utils/queryKeys";
import { message } from "antd";
import { CustomMessage } from "../utils/CustomMessage";
import ScheduleService from "../services/schedule";

export const usePublishShift = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ schoolId, untilDate }) =>
      ScheduleService.publishShift(schoolId, untilDate),
    onSuccess: () => {
      queryClient.invalidateQueries(scheduleKeys.schedule);
      CustomMessage.success("Shift published successfully!");
    },
    onError: (error) => {
      console.error("Error publishing schedules:", error);
      //   CustomMessage.error("Error creating week schedules!");
    },
  });
};

export const usepublishStaffShift = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ staffId, untilDate }) =>
      ScheduleService.publishStaffShift(staffId, untilDate),
    onSuccess: () => {
      queryClient.invalidateQueries(scheduleKeys.schedule);
      CustomMessage.success("Shift published staff successfully!");
    },
    onError: (error) => {
      console.error("Error publishing staff schedules:", error);
      //   CustomMessage.error("Error creating week schedules!");
    },
  });
};

export const useCopyByClassroom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classroomIds, startWeekDate, endWeekDate, untilDate }) =>
      ScheduleService.copyByClassroom(
        classroomIds,
        startWeekDate,
        endWeekDate,
        untilDate
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(scheduleKeys.schedule);
      CustomMessage.success("Schedules copied successfully for classrooms!");
    },
    onError: (error) => {
      console.error("Error copying schedules:", error);
      CustomMessage.error(
        "Failed to copy schedules for classrooms. Please try again."
      );
    },
  });
};

// Fetch all schedules by staff
export const useGetAllSchedulesByStaff = (params) => {
  return useQuery({
    queryKey: [
      scheduleKeys.schedule,
      params?.startDate,
      params?.endDate,
      params?.staffId,
    ],
    queryFn: () => ScheduleService.getAllSchedulesByStaff(params),
    refetchOnWindowFocus: false,
    retry: 3,
    onError: (error) =>
      console.error("Error fetching schedules by staff:", error),
  });
};

export const useGetAllSchedulesByClassroom = (classroomId, date) => {
  return useQuery({
    queryKey: [scheduleKeys.schedule, classroomId, date], // Unique key for caching
    queryFn: () =>
      ScheduleService.getAllSchedulesByClassroom(classroomId, date), // Fetch function
    enabled: !!classroomId && !!date, // Run the query only if classroomId and date are valid
    refetchOnWindowFocus: false, // Prevent refetching on window focus
    retry: 3, // Retry up to 3 times on failure
    onError: (error) => {
      console.error("Error fetching schedules by classroom:", error);
    },
  });
};
