"use client";

import type { TasksSummary } from "@/types/api";
import { KpiCard } from "@/components/ui/KpiCard";
import { ListTodo, Clock, PlayCircle, CheckCircle2 } from "lucide-react";

type ReportsSummaryGridProps = {
  summary: TasksSummary;
};

export function ReportsSummaryGrid({ summary }: ReportsSummaryGridProps) {
  const totalTasks = summary.total ?? 0;
  const todoTasks = summary.byStatus?.todo ?? 0;
  const inProgressTasks = summary.byStatus?.["in-progress"] ?? 0;
  const doneTasks = summary.byStatus?.done ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard
        label="Total Tasks"
        value={totalTasks}
        icon={<ListTodo className="w-5 h-5" />}
        iconBgColor="bg-purple-50 text-purple-600"
        valueColor="text-slate-800"
      />
      <KpiCard
        label="To Do"
        value={todoTasks}
        icon={<Clock className="w-5 h-5" />}
        iconBgColor="bg-slate-100 text-slate-600"
        valueColor="text-slate-700"
      />
      <KpiCard
        label="In Progress"
        value={inProgressTasks}
        icon={<PlayCircle className="w-5 h-5" />}
        iconBgColor="bg-amber-50 text-amber-600"
        valueColor="text-amber-600"
      />
      <KpiCard
        label="Done"
        value={doneTasks}
        icon={<CheckCircle2 className="w-5 h-5" />}
        iconBgColor="bg-emerald-50 text-emerald-600"
        valueColor="text-emerald-600"
      />
    </div>
  );
}