import axiosInstance from "../api/axiosInstance";

export const registerUser = async (payload) => {
  const { data } = await axiosInstance.post("/auth/register", payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await axiosInstance.post("/auth/login", payload);
  return data;
};

export const logoutUser = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get("/users/me");
  return data;
};

export const updateCurrentUser = async (payload) => {
  const { data } = await axiosInstance.put("/users/me", payload);
  return data;
};

export const changePassword = async (payload) => {
  const { data } = await axiosInstance.put("/users/change-password", payload);
  return data;
};