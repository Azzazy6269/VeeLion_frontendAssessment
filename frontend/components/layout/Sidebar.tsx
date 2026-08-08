"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CheckSquare, Activity, BarChart3, HelpCircle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", href: "/", icon: LayoutDashboard },
    { label: "Tasks Management", href: "/tasks", icon: CheckSquare },
    { label: "Activity Feed", href: "/activity", icon: Activity },
    { label: "Reports", href: "/reports", icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-[#0F172A] text-slate-300 min-h-screen p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-2 pt-2">
          <div className="bg-[#7C3AED] p-2 rounded-xl text-white font-bold text-xl shadow-lg shadow-purple-500/30">
            🎓
          </div>
          <span className="text-xl font-bold text-white tracking-wide">VeeLion</span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#8B5CF6] text-white shadow-lg shadow-purple-500/25 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-2 border-t border-slate-800 pt-4 px-2">
        <button className="flex items-center gap-3 text-slate-400 hover:text-white text-sm font-medium py-2 w-full transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span>Support</span>
        </button>
        <button className="flex items-center gap-3 text-rose-400 hover:text-rose-300 text-sm font-medium py-2 w-full transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}