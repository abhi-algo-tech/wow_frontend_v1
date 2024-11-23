import apiClient from "./apiClient";

// Fetch staff data
export const fetchStaff = async () => {
  const { data } = await apiClient.get("/staff");
  return data;
};

// Create new staff
export const createStaff = async (staffData) => {
  const { data } = await apiClient.post("/staff", staffData);
  return data;
};

// update staff
export const updateStaff = async (staffData) => {
  const { id, ...dataToUpdate } = staffData;
  const { data } = await apiClient.put(`/staff/${id}`, dataToUpdate);
  return data;
};

// delete staff
export const deleteStaff = async (staffData) => {
  const { id } = staffData;
  const { data } = await apiClient.delete(`/staff/${id}`);
  return data;
};

// Fetch room list
export const fetchRooms = async () => {
  const { data } = await apiClient.get("/rooms");
  return data;
};

// Fetch designation list
export const fetchDesignations = async () => {
  const { data } = await apiClient.get("/designations");
  return data;
};
