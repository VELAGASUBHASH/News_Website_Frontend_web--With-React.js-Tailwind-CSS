import axiosInstance from "../api/axiosInstance";

export const getDashboardOverview = async () => {
  const { data } = await axiosInstance.get("/get-dashboard");
  return data;
};

export const getAnalytics = async () => {
  const { data } = await axiosInstance.get("/dashboard/analytics");
  return data;
};

export const getMonthlyUsers = async () => {
  const { data } = await axiosInstance.get("/dashboard/monthly-users");
  return data;
};

export const getMonthlyArticles = async () => {
  const { data } = await axiosInstance.get("/dashboard/monthly-articles");
  return data;
};

export const getTopCategories = async () => {
  const { data } = await axiosInstance.get("/dashboard/top-categories");
  return data;
};

export const getTopAuthors = async () => {
  const { data } = await axiosInstance.get("/dashboard/top-authors");
  return data;
};