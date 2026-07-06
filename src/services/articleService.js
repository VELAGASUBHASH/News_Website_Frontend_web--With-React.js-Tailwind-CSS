import axiosInstance from "../api/axiosInstance";

export const getArticles = async (params = {}) => {
  const { data } = await axiosInstance.get("/articles", { params });
  return data;
};

export const getArticleBySlug = async (slug) => {
  const { data } = await axiosInstance.get(`/articles/${slug}`);
  return data;
};

export const getSearchSuggestions = async (query) => {
  if (!query) return { suggestions: [] };
  const { data } = await axiosInstance.get("/articles/search/suggestions", {
    params: { q: query },
  });
  return data;
};