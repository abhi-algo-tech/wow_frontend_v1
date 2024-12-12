// src/hooks/useStateService.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import StateService from "../services/stateService";
import { stateKeys } from "../utils/queryKeys";
import { message } from "antd";
import { CustomMessage } from "../utils/CustomMessage";

// Fetch all states
export const useGetAllStates = () => {
  return useQuery({
    queryKey: [stateKeys.states],
    queryFn: StateService.getAllStates,
    refetchOnWindowFocus: false,
    retry: 3,
    onError: (error) => console.error("Error fetching states:", error),
  });
};

// Fetch a single state by ID
export const useStateById = (stateId) => {
  return useQuery({
    queryKey: [stateKeys.states, stateId],
    queryFn: () => StateService.getState(stateId),
    enabled: Boolean(stateId),
    onError: (error) =>
      console.error(`Error fetching state with ID ${stateId}:`, error),
  });
};

// Create a new state
export const useCreateState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (stateData) => StateService.createState(stateData),
    onSuccess: () => {
      queryClient.invalidateQueries(stateKeys.states);
      CustomMessage.success("State created successfully!");
    },
    onError: (error) => {
      console.error("Error creating state:", error);
      CustomMessage.error("Error creating state!");
    },
  });
};

// Update an existing state
export const useUpdateState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ stateId, stateData }) =>
      StateService.updateState(stateId, stateData),
    onSuccess: () => {
      queryClient.invalidateQueries(stateKeys.states);
      CustomMessage.success("State updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating state:", error);
      CustomMessage.error("Error updating state!");
    },
  });
};

// Delete a state
export const useDeleteState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: StateService.deleteState,
    onSuccess: () => {
      queryClient.invalidateQueries(stateKeys.states);
      CustomMessage.success("State deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting state:", error);
      CustomMessage.error("Error deleting state!");
    },
  });
};
