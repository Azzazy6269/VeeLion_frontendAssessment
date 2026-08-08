"use client";

import { useReports } from "@/hooks/useReports";
import { DashboardBanner } from "@/components/ui/DashboardBanner";
import { ReportsSummaryGrid } from "./ReportsSummaryGrid";
import { CompletionRateCard } from "./CompletionRateCard";
import { RecentActivityCard } from "./RecentActivityCard";
import { RefreshCw, Loader2 } from "lucide-react";

export function ReportsDashboard() {
  const { summary, loading, error, fetchSummary } = useReports();

  const totalTasks = summary?.total ?? 0;
  const doneTasks = summary?.byStatus?.done ?? 0;
  const completionRate =
    totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <section className="space-y-6">
      <DashboardBanner
        title="Reports & Analytics"
        description="Overview of task status breakdown, completion rates, and recent activity metrics."
      />

      {loading ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 flex justify-center items-center text-purple-600 shadow-sm">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : null}

      {error ? (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-rose-700 flex justify-between items-center">
          <p className="text-sm font-medium">{error}</p>
          <button
            type="button"
            className="px-4 py-2 text-xs font-bold bg-rose-600 text-white rounded-xl flex items-center gap-1.5 hover:bg-rose-700 transition-colors"
            onClick={fetchSummary}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      ) : null}

      {!loading && !error && summary ? (
        <div className="space-y-6">
          <ReportsSummaryGrid summary={summary} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <CompletionRateCard rate={completionRate} />
            <RecentActivityCard count={summary.recentActivityCount ?? 0} />
          </div>
        </div>
      ) : null}
    </section>
  );
}