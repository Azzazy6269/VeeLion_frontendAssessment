"use client";

import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import type { TasksSummary } from "@/types/api";
import getErrorMessage from "@/lib/getErrorMessage_helper"

export function useReports() {
  const [summary, setSummary] = useState<TasksSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiClient.get<TasksSummary>("/api/reports/tasks-summary");
      setSummary(response.data);
    } catch (error) {
      setError(getErrorMessage(error, "Could not load reports summary right now."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return {
    summary,
    loading,
    error,
    fetchSummary,
  };
}