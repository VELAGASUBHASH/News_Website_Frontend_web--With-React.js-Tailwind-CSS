import axiosInstance from "../api/axiosInstance";

export const getComments = async (articleId) => {
  const { data } = await axiosInstance.get(`/comments/${articleId}`);
  return data;
};

export const addComment = async ({ articleId, content, parentComment }) => {
  const payload = { article: articleId, content };
  if (parentComment) payload.parentComment = parentComment;

  const { data } = await axiosInstance.post("/comments", payload);
  return data;
};

export const updateComment = async (commentId, content) => {
  const { data } = await axiosInstance.put(`/comments/${commentId}`, { content });
  return data;
};

export const deleteComment = async (commentId) => {
  const { data } = await axiosInstance.delete(`/comments/${commentId}`);
  return data;
};