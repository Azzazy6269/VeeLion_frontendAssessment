import api from "./api";
import type { Task, TaskResponse, TasksResponse } from "@/types/api";

export async function getTasksFromBackend(): Promise<Task[]> {
  const response = await api.get<TasksResponse>("/tasks");
  return response.data.data;
}

export async function updateTaskInBackend(taskId: string, completed: boolean): Promise<Task> {
  const response = await api.patch<TaskResponse>(`/tasks/${taskId}`, { completed });
  return response.data.data;
}