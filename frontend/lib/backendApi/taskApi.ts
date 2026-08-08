import api from "../api";
import type {
    Task, 
    getTaskResponse, 
    getTasksResponse, 
    CreateTaskRequest, 
    CreateTaskResponse,
    PatchTaskRequest,
    PatchTaskResponse,
    DeleteTaskResponse 
} from "@/types/api";

export async function getTasksFromBackend(): Promise<Task[]> {
  const response = await api.get<getTasksResponse>("/tasks");
  return response.data.data;
}

export async function getTaskByIdFromBackend(taskId: string): Promise<Task> {
  const response = await api.patch<getTaskResponse>(`/tasks/${taskId}`);
  return response.data.data;
}

export async function createTaskInBackend(data: CreateTaskRequest): Promise<Task> {
  const response = await api.patch<CreateTaskResponse>(`/tasks`, data);
  return response.data.data;
}

export async function updateTaskInBackend(taskId: string, data: PatchTaskRequest): Promise<Task> {
  const response = await api.patch<PatchTaskResponse>(`/tasks/${taskId}`, data);
  return response.data.data;
}

export async function deleteTaskFromBackend(taskId: string): Promise<DeleteTaskResponse> {
  await api.delete(`/tasks/${taskId}`);
}