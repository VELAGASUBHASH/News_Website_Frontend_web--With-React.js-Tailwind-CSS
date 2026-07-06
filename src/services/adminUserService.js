import axiosInstance from "../api/axiosInstance";

export const getAllUsers = async () => {
  const { data } = await axiosInstance.get("/admin/users");
  return data;
};

export const getUserById = async (id) => {
  const { data } = await axiosInstance.get(`/admin/users/${id}`);
  return data;
};

export const updateUserRole = async (id, role) => {
  const { data } = await axiosInstance.patch(`/admin/users/${id}/role`, { role });
  return data;
};

export const updateUserStatus = async (id, status) => {
  const { data } = await axiosInstance.patch(`/admin/users/${id}/status`, { status });
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await axiosInstance.delete(`/admin/users/${id}`);
  return data;
};