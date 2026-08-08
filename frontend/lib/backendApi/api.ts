import axios, { AxiosError } from "axios";

import { BACKEND_BASE_URL } from "@/lib/constants";

import type { ErrorResponse } from "@/types/api";



const api = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },

});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    const serverMessage = error.response?.data?.error?.message;
    const fallbackMessage = `Request failed with status ${error.response?.status || 500}`;
    return Promise.reject(new Error(serverMessage || fallbackMessage));

  }

);

export default api;
