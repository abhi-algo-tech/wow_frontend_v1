// src/hooks/useCountryService.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CountryService from "../services/countryService";
import { countryKeys } from "../utils/queryKeys";
import { message } from "antd";
import { useState } from "react";
import { CustomMessage } from "../utils/CustomMessage";

// Fetch all countries
export const useGetAllCountries = () => {
  return useQuery({
    queryKey: [countryKeys.countries],
    queryFn: CountryService.getAllCountries,
    refetchOnWindowFocus: false,
    retry: 3,
    onError: (error) => console.error("Error fetching countries:", error),
  });
};

// Fetch a single country by ID
export const useCountryById = (countryId) => {
  return useQuery({
    queryKey: [countryKeys.countries, countryId],
    queryFn: () => CountryService.getCountry(countryId),
    enabled: Boolean(countryId),
    onError: (error) =>
      console.error(`Error fetching country with ID ${countryId}:`, error),
  });
};

// Create a new country
export const useCreateCountry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (countryData) => CountryService.createCountry(countryData),
    onSuccess: () => {
      queryClient.invalidateQueries(countryKeys.countries);
      CustomMessage.success("Country created successfully!");
    },
    onError: (error) => {
      console.error("Error creating country:", error);
      CustomMessage.error("Error creating country!");
    },
  });
};

// Update an existing country
export const useUpdateCountry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ countryId, countryData }) =>
      CountryService.updateCountry(countryId, countryData),
    onSuccess: () => {
      queryClient.invalidateQueries(countryKeys.countries);
      CustomMessage.success("Country updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating country:", error);
      CustomMessage.error("Error updating country!");
    },
  });
};

// Delete a country
export const useDeleteCountry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CountryService.deleteCountry,
    onSuccess: () => {
      queryClient.invalidateQueries(countryKeys.countries);
      CustomMessage.success("Country deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting country:", error);
      CustomMessage.error("Error deleting country!");
    },
  });
};
