import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchStaff,
  createStaff,
  fetchRooms,
  fetchDesignations,
  updateStaff,
  deleteStaff,
} from "../services/staffService";
import { staffKeys } from "../utils/queryKeys";

// Hook for fetching staff data
export const useStaffData = () => {
  return useQuery({
    queryKey: staffKeys.list(),
    queryFn: fetchStaff,
  });
};

// Hook for creating new staff
export const useCreateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffKeys.list() });
    },
  });
};

// Hook for update staff
export const useUpdateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffKeys.list() });
    },
  });
};

// Hook for update staff
export const useDeleteStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffKeys.list() });
    },
  });
};

// Hook for fetching room list
export const useRoomsData = () => {
  return useQuery({
    queryKey: staffKeys.rooms(),
    queryFn: fetchRooms,
  });
};

// Hook for fetching designations
export const useDesignationsData = () => {
  return useQuery({
    queryKey: staffKeys.designations(),
    queryFn: fetchDesignations,
  });
};
