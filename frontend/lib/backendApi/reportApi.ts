import api from "./../api";
import type { GetTasksSummaryResponse } from "@/types/api";

export async function getTasksSummaryFromBackend(): Promise<GetTasksSummaryResponse> {
  const response = await api.get<GetTasksSummaryResponse>("/reports/tasks-summary");
  return response.data;
}