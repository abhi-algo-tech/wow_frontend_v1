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
      //   CustomMessage.success("Week schedules created successfully!");
    },
    onError: (error) => {
      console.error("Error publishing schedules:", error);
      //   CustomMessage.error("Error creating week schedules!");
    },
  });
};
