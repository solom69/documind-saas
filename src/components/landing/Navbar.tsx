"use client";

import Link from "next/link";
import { useState } from "react";
import { FileText, Sparkles, ShieldCheck, ArrowRight, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-50">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <span>Docu<span className="text-indigo-600 dark:text-indigo-400">Mind</span></span>
          <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 ml-1">AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <a href="#features" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Features</a>
          <a href="#demo" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Live Interactive Demo</a>
          <a href="#pricing" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Pricing</a>
          <a href="#security" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Enterprise Security</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/auth/signin"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white px-3 py-2 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Open Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-3">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Features
          </a>
          <a
            href="#demo"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Live Demo
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Pricing
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/auth/signin"
              className="text-center py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 rounded-lg"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="text-center py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-sm"
            >
              Go to App Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
