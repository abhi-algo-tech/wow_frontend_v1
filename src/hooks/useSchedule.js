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
