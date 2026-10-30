"use client";

import { Sparkles, ExternalLink, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface AdBannerProps {
  variant?: "banner" | "sidebar" | "in-chat";
}

export function AdBanner({ variant = "banner" }: AdBannerProps) {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  if (variant === "in-chat") {
    return (
      <div className="my-3 p-3 rounded-xl border border-dashed border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/70 via-purple-50/50 to-pink-50/40 dark:from-zinc-900 dark:via-indigo-950/20 dark:to-zinc-900 text-xs relative">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
          <span>Sponsored Recommendation</span>
          <Link href="/dashboard/billing" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5">
            Remove Ads with Pro
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              ⚡
            </div>
            <div>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Supabase Database & Auth</span>
              <p className="text-[11px] text-zinc-500">Build backend apps in minutes with serverless Postgres.</p>
            </div>
          </div>
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-[11px] shrink-0 hover:opacity-90"
          >
            Visit
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-900/70 mb-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[9px] font-bold uppercase tracking-wider text-zinc-500">
          Ad
        </span>
        <div className="text-xs">
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            Automate your contracts with DocuMind Pro
          </span>
          <span className="text-zinc-500 ml-1.5">
            — Upgrade for unlimited queries, 0 ads, and 1-click clause exports.
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href="/dashboard/billing"
          className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold transition-all shadow-sm shadow-indigo-600/20"
        >
          Upgrade $19/mo
        </Link>
        <button
          onClick={() => setClosed(true)}
          className="p-1 rounded text-zinc-400 hover:text-zinc-600 text-xs"
          title="Dismiss ad"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
