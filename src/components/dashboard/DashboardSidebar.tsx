"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FileText, 
  MessageSquare, 
  CreditCard, 
  Settings, 
  ShieldCheck, 
  Sparkles, 
  LogOut,
  FolderOpen,
  Plus
} from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Documents Hub", href: "/dashboard", icon: FolderOpen },
    { name: "AI Query Workspace", href: "/dashboard/chat", icon: MessageSquare },
    { name: "Billing & Plans", href: "/dashboard/billing", icon: CreditCard },
    { name: "Team & Security", href: "/dashboard/settings", icon: ShieldCheck },
  ];

  return (
    <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Brand */}
        <div className="h-16 px-6 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <Link href="/" className="font-bold text-base tracking-tight text-zinc-900 dark:text-zinc-50">
            Docu<span className="text-indigo-600">Mind</span>
          </Link>
          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 ml-auto">
            PRO
          </span>
        </div>

        {/* Workspace selector */}
        <div className="p-4">
          <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="truncate">
              <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">Acme Legal & Finance</div>
              <div className="text-[10px] text-zinc-500">18 Active Team Seats</div>
            </div>
            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Account Bottom Card */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
            AL
          </div>
          <div className="truncate flex-1">
            <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">Alex Lindqvist</div>
            <div className="text-[10px] text-zinc-400 truncate">alex@acmecorp.com</div>
          </div>
        </div>

        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out to Landing
        </Link>
      </div>
    </aside>
  );
}
