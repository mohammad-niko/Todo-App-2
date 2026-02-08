import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log(error.response);
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth/signin";
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
