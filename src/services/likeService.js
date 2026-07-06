import axiosInstance from "../api/axiosInstance";

export const toggleLike = async (articleId) => {
  const { data } = await axiosInstance.post("/likes", { article: articleId });
  return data;
};

export const getLikeCount = async (articleId) => {
  const { data } = await axiosInstance.get(`/likes/${articleId}`);
  return data;
};

export const getLikeStatus = async (articleId) => {
  const { data } = await axiosInstance.get(`/likes/check/${articleId}`);
  return data;
};