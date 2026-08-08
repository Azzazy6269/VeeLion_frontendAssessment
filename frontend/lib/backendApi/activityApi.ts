import api from "../api";
import type { ActivityLog, CreateActivityRequest } from "@/types/api";

export async function getActivityFromBackend(): Promise<ActivityLog[]> {
  const response = await api.get<ActivityLog[]>("/activity");
  return response.data;
}

export async function createActivityInBackend(data: CreateActivityRequest): Promise<ActivityLog> {
  const response = await api.post<ActivityLog>("/activity", data);
  return response.data;
}