"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckSquare, Activity, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Tasks", href: "/tasks", icon: CheckSquare },
    { label: "Activity Feed", href: "/activity", icon: Activity },
    { label: "Reports", href: "/reports", icon: BarChart3 },
  ];

  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-2">
          <div className="bg-slate-900 text-white p-1.5 rounded-lg">
            <CheckSquare className="w-5 h-5" />
          </div>
          <span>VeeLion Tasks</span>
        </Link>

        <nav className="flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-100 text-slate-900 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}