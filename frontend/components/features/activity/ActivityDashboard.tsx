"use client";

import { useCallback, useMemo, useState } from "react";
import { useActivity } from "@/hooks/useActivity";
import type { CreateActivityRequest } from "@/types/api";
import { DashboardBanner } from "@/components/ui/DashboardBanner";
import { ActivityModal } from "@/components/features/activity/ActivityModal";
import { ActivitySearchFilter } from "@/components/features/activity/ActivitySearchFilter";
import { ActivityTable } from "@/components/features/activity/ActivityTable";
import { RefreshCw } from "lucide-react";

export function ActivityDashboard() {
  const {
    activities,
    loading,
    error,
    fetchActivities,
    createActivity,
    isCreating,
  } = useActivity();

  const [query, setQuery] = useState("");

  const handleCreateActivity = useCallback(
    async (data: CreateActivityRequest) => {
      await createActivity(data);
    },
    [createActivity]
  );

  const filteredActivities = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return activities;

    return activities.filter(
      (item) =>
        (item.action || "").toLowerCase().includes(cleanQuery) ||
        (item.info || "").toLowerCase().includes(cleanQuery)
    );
  }, [activities, query]);

  return (
    <section className="space-y-6">
      <DashboardBanner
        title="Activity Feed"
        description="Monitor system operations, user interactions, and audit logs in real-time."
        actionButton={
          <ActivityModal
            onSubmit={handleCreateActivity}
            isLoading={isCreating}
          />
        }
      />

      <ActivitySearchFilter
        query={query}
        onChange={setQuery}
        totalCount={activities.length}
        showingCount={filteredActivities.length}
      />

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-rose-700 flex justify-between items-center">
          <p className="text-sm font-medium">{error}</p>
          <button
            type="button"
            className="px-4 py-2 text-xs font-bold bg-rose-600 text-white rounded-xl flex items-center gap-1.5 hover:bg-rose-700 transition-colors"
            onClick={fetchActivities}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      )}

      <ActivityTable activities={filteredActivities} loading={loading} />
    </section>
  );
}