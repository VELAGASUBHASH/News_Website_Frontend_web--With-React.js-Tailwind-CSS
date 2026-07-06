import axiosInstance from "../api/axiosInstance";

export const createArticle = async (payload) => {
  const { data } = await axiosInstance.post("/articles", payload);
  return data;
};

export const updateArticle = async (id, payload) => {
  const { data } = await axiosInstance.put(`/articles/${id}`, payload);
  return data;
};

export const deleteArticle = async (id) => {
  const { data } = await axiosInstance.delete(`/articles/${id}`);
  return data;
};