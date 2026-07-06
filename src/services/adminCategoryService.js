import axiosInstance from "../api/axiosInstance";

export const createCategory = async (payload) => {
  const { data } = await axiosInstance.post("/categories", payload);
  return data;
};

export const updateCategory = async (id, payload) => {
  const { data } = await axiosInstance.put(`/categories/${id}`, payload);
  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await axiosInstance.delete(`/categories/${id}`);
  return data;
};