import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MasterLookUpService from "../services/masterLookUpService";
import { masterLookUpKeys } from "../utils/queryKeys";
import { CustomMessage } from "../utils/CustomMessage";

// Fetch all Master Lookup entries
export const useGetAllMasterLookups = () => {
  return useQuery({
    queryKey: [masterLookUpKeys.masterLookups],
    queryFn: MasterLookUpService.getAllMasterLookups,
    refetchOnWindowFocus: false,
    retry: 3,
    onError: (error) => {
      console.error("Error fetching master lookups:", error);
    },
  });
};

// Fetch Master Lookup by type
export const useMasterLookupsByType = (type) => {
  return useQuery({
    queryKey: [masterLookUpKeys.masterLookups, type],
    queryFn: () => MasterLookUpService.getMasterLookupsByType(type),
    enabled: Boolean(type), // Enable query only if `type` is defined
    onError: (error) => {
      console.error(`Error fetching master lookups for type ${type}:`, error);
    },
  });
};

// Fetch a single Master Lookup entry by ID
export const useMasterLookUpById = (lookUpId) => {
  return useQuery({
    queryKey: [masterLookUpKeys.masterLookups, lookUpId],
    queryFn: () => MasterLookUpService.getMasterLookUp(lookUpId),
    enabled: Boolean(lookUpId), // Enable query only if `lookUpId` is defined
    onError: (error) => {
      console.error(`Error fetching master lookup by ID ${lookUpId}:`, error);
    },
  });
};

// Create a new Master Lookup entry
export const useCreateMasterLookUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lookUpData) =>
      MasterLookUpService.createMasterLookUp(lookUpData),
    onSuccess: () => {
      queryClient.invalidateQueries(masterLookUpKeys.masterLookups);
      CustomMessage.success("Master lookup entry created successfully!");
    },
    onError: (error) => {
      console.error("Error creating master lookup entry:", error);
      CustomMessage.error("Error creating master lookup entry!");
    },
  });
};

// Update a Master Lookup entry
export const useUpdateMasterLookUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lookUpId, lookUpData }) =>
      MasterLookUpService.updateMasterLookUp(lookUpId, lookUpData),
    onSuccess: (data, { lookUpId }) => {
      queryClient.invalidateQueries(masterLookUpKeys.masterLookups);
      queryClient.invalidateQueries({
        queryKey: [masterLookUpKeys.masterLookups, lookUpId],
      });
      CustomMessage.success("Master lookup entry updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating master lookup entry:", error);
      CustomMessage.error("Error updating master lookup entry!");
    },
  });
};

// Delete a Master Lookup entry
export const useDeleteMasterLookUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MasterLookUpService.deleteMasterLookUp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: masterLookUpKeys.masterLookups,
      });
      CustomMessage.success("Master lookup entry deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting master lookup entry:", error);
      CustomMessage.error("Error deleting master lookup entry!");
    },
  });
};
