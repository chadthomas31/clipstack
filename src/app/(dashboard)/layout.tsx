"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  Upload,
  Scissors,
  Calendar,
  Settings,
  CreditCard,
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  Menu,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/upload", icon: Upload, label: "Upload" },
  { href: "/dashboard/clips", icon: Scissors, label: "My Clips" },
  { href: "/dashboard/schedule", icon: Calendar, label: "Schedule" },
  { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [credits, setCredits] = useState({ used: 0, total: 120, remaining: 120 });

  useEffect(() => {
    if (session) {
      fetch("/api/billing")
        .then((r) => r.json())
        .then((data) => {
          if (data.credits) setCredits(data.credits);
        })
        .catch(() => {});
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  if (!session) {
    if (typeof window !== "undefined") window.location.href = "/login";
    return null;
  }

  const creditPercent = credits.total > 0 ? ((credits.total - credits.used) / credits.total) * 100 : 0;

  return (
    <div className="flex h-screen bg-zinc-950">
      {/* Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-zinc-800 bg-zinc-900/50 transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-zinc-800">
          {!collapsed && (
            <Link href="/" className="text-lg font-bold gradient-text">
              ForJClients
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            {collapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="p-4 border-t border-zinc-800">
            <div className="card !p-3">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-zinc-400">Credits</span>
                <span className="text-indigo-400 font-medium">
                  {credits.remaining} / {credits.total}
                </span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all"
                  style={{ width: `${creditPercent}%` }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="p-2 border-t border-zinc-800">
          {!collapsed && session?.user?.name && (
            <div className="px-3 py-2 text-xs text-zinc-500 truncate">
              {session.user.name}
            </div>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && "Sign Out"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
