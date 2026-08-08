"use client";

import { Activity } from "lucide-react";

type RecentActivityCardProps = {
  count: number;
};

export function RecentActivityCard({ count }: RecentActivityCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm">
            Recent Activity
          </h4>
          <p className="text-xs text-slate-400">System audit logs count</p>
        </div>
      </div>

      <div className="pt-4 flex items-baseline gap-2">
        <span className="text-3xl font-black text-indigo-600">
          {count}
        </span>
        <span className="text-xs font-medium text-slate-400">
          logged events
        </span>
      </div>
    </div>
  );
}