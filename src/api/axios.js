import axios from "axios";

const BASE_URL = "/api";

export const customFetch = axios.create({
  baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
});
