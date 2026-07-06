import axios from "axios";

const API_BASE_URL = "https://amaravati-times.onrender.com/api";
const TOKEN_KEY = "amaravati_times_token";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      const isOnAuthPage =
        window.location.pathname === "/login" ||
        window.location.pathname === "/register";
      if (!isOnAuthPage) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export { TOKEN_KEY };
export default axiosInstance;
