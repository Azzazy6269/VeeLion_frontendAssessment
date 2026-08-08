"use client";

import React from "react";

type KpiCardProps = {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor?: string;
  valueColor?: string;
};

export function KpiCard({
  label,
  value,
  icon,
  iconBgColor = "bg-purple-50 text-purple-600",
  valueColor = "text-slate-800",
}: KpiCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </p>
        <h3 className={`text-2xl font-black mt-1 ${valueColor}`}>
          {value}
        </h3>
      </div>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBgColor}`}>
        {icon}
      </div>
    </div>
  );
}