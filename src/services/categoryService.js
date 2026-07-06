import axiosInstance from "../api/axiosInstance";

export const getCategories = async () => {
  const { data } = await axiosInstance.get("/categories");
  return data;
};

export const getCategoryById = async (id) => {
  const { data } = await axiosInstance.get(`/categories/${id}`);
  return data;
};