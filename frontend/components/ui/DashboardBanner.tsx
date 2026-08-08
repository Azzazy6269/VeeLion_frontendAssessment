import React from "react";

type DashboardBannerProps = {
  title: string;
  description: string;
  actionButton?: React.ReactNode;
};

export function DashboardBanner({ title, description, actionButton }: DashboardBannerProps) {
  return (
    <div className="w-full bg-gradient-to-r from-[#1E1B4B] via-[#311042] to-[#4C1D95] text-white rounded-2xl p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-2 z-10">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-purple-200/80 text-sm max-w-xl">{description}</p>
      </div>

      {actionButton && <div className="z-10 shrink-0">{actionButton}</div>}
    </div>
  );
}