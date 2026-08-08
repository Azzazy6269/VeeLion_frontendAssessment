"use client";

import { TrendingUp } from "lucide-react";

type CompletionRateCardProps = {
  rate: number;
};

export function CompletionRateCard({ rate }: CompletionRateCardProps) {
  return (
    <div className="md:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-base">
              Completion Rate
            </h4>
            <p className="text-xs text-slate-400">
              Percentage of tasks marked as 'Done'
            </p>
          </div>
        </div>
        <span className="text-2xl font-black text-purple-600">
          {rate}%
        </span>
      </div>

      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${rate}%` }}
        />
      </div>
    </div>
  );
}