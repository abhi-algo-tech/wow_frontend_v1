import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

const CountryService = {
  getAllCountries: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.COUNTRY.BASE);
      return response.data;
    } catch (error) {
      console.error("Error fetching countries:", error);
      throw error;
    }
  },

  getCountry: async (countryId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.COUNTRY.BASE}/${countryId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching country with ID ${countryId}:`, error);
      throw error;
    }
  },

  createCountry: async (countryData) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.COUNTRY.BASE,
        countryData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating country:", error);
      throw error;
    }
  },

  updateCountry: async (countryId, countryData) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.COUNTRY.BASE}/${countryId}`,
        countryData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating country with ID ${countryId}:`, error);
      throw error;
    }
  },

  deleteCountry: async (countryId) => {
    try {
      const response = await axiosInstance.delete(
        `${API_ENDPOINTS.COUNTRY.BASE}/${countryId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting country with ID ${countryId}:`, error);
      throw error;
    }
  },
};

export default CountryService;
