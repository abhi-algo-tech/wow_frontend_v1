// src/hooks/useCityService.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CityService from "../services/cityService";
import { cityKeys } from "../utils/queryKeys";
import { message } from "antd";
import { CustomMessage } from "../utils/CustomMessage";

// Fetch all cities
export const useGetAllCities = () => {
  return useQuery({
    queryKey: [cityKeys.cities],
    queryFn: CityService.getAllCities,
    refetchOnWindowFocus: false,
    retry: 3,
    onError: (error) => console.error("Error fetching cities:", error),
  });
};

// Fetch a single city by ID
export const useCityById = (cityId) => {
  return useQuery({
    queryKey: [cityKeys.cities, cityId],
    queryFn: () => CityService.getCity(cityId),
    enabled: Boolean(cityId),
    onError: (error) =>
      console.error(`Error fetching city with ID ${cityId}:`, error),
  });
};

// Create a new city
export const useCreateCity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cityData) => CityService.createCity(cityData),
    onSuccess: () => {
      queryClient.invalidateQueries(cityKeys.cities);
      CustomMessage.success("City created successfully!");
    },
    onError: (error) => {
      console.error("Error creating city:", error);
      CustomMessage.error("Error creating city!");
    },
  });
};

// Update an existing city
export const useUpdateCity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cityId, cityData }) =>
      CityService.updateCity(cityId, cityData),
    onSuccess: () => {
      queryClient.invalidateQueries(cityKeys.cities);
      CustomMessage.success("City updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating city:", error);
      CustomMessage.error("Error updating city!");
    },
  });
};

// Delete a city
export const useDeleteCity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CityService.deleteCity,
    onSuccess: () => {
      queryClient.invalidateQueries(cityKeys.cities);
      CustomMessage.success("City deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting city:", error);
      CustomMessage.error("Error deleting city!");
    },
  });
};
