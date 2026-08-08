"use client";

import { useMemo } from "react";
import type { ActivityLog } from "@/types/api";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

type ActivityTableProps = {
  activities: ActivityLog[];
  loading: boolean;
};

export function ActivityTable({ activities, loading }: ActivityTableProps) {
  const columns = useMemo<Column<ActivityLog>[]>(
    () => [
      {
        header: "ACTION",
        className: "w-48",
        cell: (item) => (
          <Badge className="bg-purple-50 text-purple-700 border border-purple-200 font-bold px-3 py-1 rounded-lg break-all max-w-full">
            {item.action || "N/A"}
          </Badge>
        ),
      },
      {
        header: "DETAILS",
        className: "w-auto",
        cell: (item) => (
          <p className="text-slate-700 font-medium break-words whitespace-pre-wrap max-w-xl">
            {item.info || "No details provided"}
          </p>
        ),
      },
      {
        header: "TIMESTAMP",
        className: "w-48",
        cell: (item) => (
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">
              {new Date(item.when).toLocaleString()}
            </span>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <DataTable
      columns={columns}
      data={activities}
      loading={loading}
      emptyMessage="No activity logs match your search criteria."
    />
  );
}