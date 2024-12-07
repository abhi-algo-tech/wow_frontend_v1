import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

const CityService = {
  getAllCities: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.CITY.BASE);
      return response.data;
    } catch (error) {
      console.error("Error fetching cities:", error);
      throw error;
    }
  },

  getCity: async (cityId) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.CITY.BASE}/${cityId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching city with ID ${cityId}:`, error);
      throw error;
    }
  },

  createCity: async (cityData) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.CITY.BASE,
        cityData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating city:", error);
      throw error;
    }
  },

  updateCity: async (cityId, cityData) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.CITY.BASE}/${cityId}`,
        cityData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating city with ID ${cityId}:`, error);
      throw error;
    }
  },

  deleteCity: async (cityId) => {
    try {
      const response = await axiosInstance.delete(
        `${API_ENDPOINTS.CITY.BASE}/${cityId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting city with ID ${cityId}:`, error);
      throw error;
    }
  },
};

export default CityService;
