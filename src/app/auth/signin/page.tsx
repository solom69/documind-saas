"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles, ArrowRight, Mail, Lock, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const router = useRouter();
  const supabase = createClient();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data?.session) {
          router.push("/dashboard");
        } else {
          setSuccessMsg("Account created! Check your email to confirm registration or sign in directly.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl tracking-tight text-zinc-900 dark:text-zinc-50">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <span>Docu<span className="text-indigo-600 dark:text-indigo-400">Mind</span></span>
        </Link>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {isSignUp ? "Create your free study & document account" : "Sign in to your DocuMind workspace"}
        </h2>
        <p className="mt-2 text-xs text-zinc-500">
          {isSignUp ? "Already have an account? " : "New to DocuMind? "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className="font-semibold text-indigo-600 hover:text-indigo-500 underline ml-1"
          >
            {isSignUp ? "Sign In instead" : "Create a free account"}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-zinc-900 py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-zinc-200 dark:border-zinc-800">
          
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-700 dark:text-rose-300">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-700 dark:text-emerald-300">
              {successMsg}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  value={email}
                  placeholder="student@university.edu"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.01]"
              >
                {loading ? "Processing..." : isSignUp ? "Create Free Account" : "Sign In to Workspace"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Quick Demo Bypass Button */}
          <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-center">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            >
              Skip login & browse Demo Dashboard →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
