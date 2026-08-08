"use client";

import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import type { ActivityLog, CreateActivityRequest } from "@/types/api";

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}

export function useActivity() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiClient.get<ActivityLog[]>("/api/activity");
      setActivities(response.data);
    } catch (error) {
      setError(getErrorMessage(error, "Could not load activity logs right now."));
    } finally {
      setLoading(false);
    }
  }, []);

  const createActivity = useCallback(async (data: CreateActivityRequest) => {
    try {
      setIsCreating(true);
      setError("");

      const response = await apiClient.post<ActivityLog>("/api/activity", data);
      setActivities((prev) => [response.data, ...prev]);
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error, "Could not log activity.");
      setError(message);
      throw error;
    } finally {
      setIsCreating(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return {
    activities,
    loading,
    isCreating,
    error,
    fetchActivities,
    createActivity,
  };
}