"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { 
  DeleteTaskResponse, 
  ErrorResponse, 
  Task, 
  TaskFilter, 
  getTaskResponse, 
  getTasksResponse,
  PatchTaskRequest,
  CreateTaskRequest
 } from "@/types/api";
import apiClient from "@/lib/apiClient";
import getErrorMessage from "@/lib/getErrorMessage_helper"

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [singleTask,setSingleTask] = useState<Task | null>(null)
  const [filter, setFilter] = useState<TaskFilter>("all");

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSingleTask, setLoadingSingleTask] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [updatingTaskId, setUpdatingTaskId] = useState<string>("");
  const [deletingTaskId, setDeletingTaskId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const body = await apiClient.get<getTasksResponse>("/api/tasks");

      setTasks(body.data.data);
    } catch (error) {
      setError(getErrorMessage(error, "Could not load tasks right now."));
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = useCallback(async (taskId: string, task:PatchTaskRequest) => {
    try {
      setUpdatingTaskId(taskId);
      setError("");

      const body = await apiClient.patch<getTaskResponse>(`/api/tasks/${taskId}`, task);

      setTasks((previous) =>
        previous.map((task) => (task.id === taskId ? body.data.data : task))
      );
    } catch (error) {
      setError(getErrorMessage(error, "Could not update task status."));
    } finally {
      setUpdatingTaskId("");
    }
  }, []);

  const getSingleTask = useCallback(async (taskId: string) => {
    try {
      setLoadingSingleTask(true);
      setError("");

      const body = await apiClient.get<getTaskResponse>(`/api/tasks/${taskId}`);

      setSingleTask(body.data.data);
    } catch (error) {
      setError(getErrorMessage(error, "Could not load tasks right now."));
    } finally {
      setLoadingSingleTask(false);
    }
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      setDeletingTaskId(taskId);
      setError("");
      const body = await apiClient.delete<DeleteTaskResponse>(`/api/tasks/${taskId}`);
      setTasks((previous) => previous.filter((task) => task.id !== taskId));
      setSingleTask((prev) => (prev?.id === taskId ? null : prev));
    } catch (error) {
      setError(getErrorMessage(error, "Could not load tasks right now."));
    } finally {
      setDeletingTaskId("");
    }
  }, []);

  const createTask = useCallback(async (taskData: CreateTaskRequest) => {
    try {
      setIsCreating(true);
      setError("");
      const response = await apiClient.post<getTaskResponse>("/api/tasks", taskData);
      setTasks((prev) => [response.data.data, ...prev]);
      return response.data.data;
    } catch (error) {
      const message = getErrorMessage(error, "Could not create task.");
      setError(message);
      throw error;
    } finally {
      setIsCreating(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }

    if (filter === "pending") {
      return tasks.filter((task) => !task.completed);
    }

    return tasks;
  }, [tasks, filter]);

  return {
    tasks,
    singleTask,
    filteredTasks,
    filter,
    loading,
    isCreating,
    updatingTaskId,
    deletingTaskId,
    error,
    setFilter,
    fetchTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask,
  };
}
