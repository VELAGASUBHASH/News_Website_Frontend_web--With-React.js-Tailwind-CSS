import axiosInstance from "../api/axiosInstance";

export const getBookmarks = async () => {
  const { data } = await axiosInstance.get("/bookmarks");
  return data;
};

export const getBookmarkStatus = async (articleId) => {
  const { data } = await axiosInstance.get(`/bookmarks/status/${articleId}`);
  return data;
};

export const toggleBookmark = async (articleId) => {
  const { data } = await axiosInstance.post(`/bookmarks/${articleId}`);
  return data;
};