import axios from "axios";

export const BASE_URL = "http://localhost:3000"; // "http://172.20.10.4:3000";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
