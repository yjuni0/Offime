import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가 (요청할 때마다 최신 토큰 반영)
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("CL_access_token"); // 최신 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
