import axios, { AxiosError } from "axios";
import type { ErrorResponse } from "@/types/api";

const apiClient = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    const serverMessage = error.response?.data?.error?.message;
    const fallbackMessage =
      error.message || `Request failed with status ${error.response?.status || 500}`;

    return Promise.reject(new Error(serverMessage || fallbackMessage));
  }
);

export default apiClient;