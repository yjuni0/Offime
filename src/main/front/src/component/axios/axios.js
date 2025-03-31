import axios from "axios";
const token = localStorage.getItem("CL_access_token");
const BASE_URL = "http://localhost:8080/";
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
