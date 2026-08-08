import api from "./api";
import type { ActivityLog } from "@/types/api";

export async function getActivityFromBackend(): Promise<ActivityLog[]> {
  const response = await api.get<ActivityLog[]>("/activity");
  return response.data;
}