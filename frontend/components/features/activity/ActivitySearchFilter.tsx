"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type ActivitySearchFilterProps = {
  query: string;
  onChange: (value: string) => void;
  totalCount: number;
  showingCount: number;
};

export function ActivitySearchFilter({
  query,
  onChange,
  totalCount,
  showingCount,
}: ActivitySearchFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search activity by action or info..."
          value={query}
          onChange={(e) => onChange(e.target.value)}
          className="pl-9 rounded-xl border-slate-200 focus:ring-purple-500"
        />
      </div>

      <div className="text-xs font-semibold text-slate-500 flex items-center gap-2">
        <span>Total Logs: <strong className="text-slate-800">{totalCount}</strong></span>
      </div>
    </div>
  );
}