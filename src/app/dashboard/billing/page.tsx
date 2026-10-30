"use client";

import { useState } from "react";
import { Check, CreditCard, Shield, Download, Sparkles, ArrowRight } from "lucide-react";
import { BillingInvoice } from "@/types";
import confetti from "canvas-confetti";

const MOCK_INVOICES: BillingInvoice[] = [
  { id: "INV-2026-004", date: "Oct 1, 2026", amount: "$64.00", status: "Paid", pdfUrl: "#" },
  { id: "INV-2026-003", date: "Sep 1, 2026", amount: "$64.00", status: "Paid", pdfUrl: "#" },
  { id: "INV-2026-002", date: "Aug 1, 2026", amount: "$64.00", status: "Paid", pdfUrl: "#" },
  { id: "INV-2026-001", date: "Jul 1, 2026", amount: "$64.00", status: "Paid", pdfUrl: "#" }
];

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState<"Free (Ad-Supported)" | "Starter" | "Professional" | "Enterprise">("Free (Ad-Supported)");
  const [upgraded, setUpgraded] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const handleUpgrade = async (plan: "Starter" | "Professional" | "Enterprise", price: number) => {
    setLoadingCheckout(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName: plan,
          priceAmount: price,
          billingInterval: "month"
        })
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }

      // Simulated local test mode
      setCurrentPlan(plan);
      setUpgraded(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => setUpgraded(false), 4000);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingCheckout(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Billing, Usage & Subscription
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Manage your seat allocation, document parsing quotas, and enterprise invoice history.
        </p>
      </div>

      {upgraded && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between">
          <span>Subscription plan successfully updated to {currentPlan}!</span>
        </div>
      )}

      {/* Current Plan Overview Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Active Tier
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              Annual Billed
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">
            {currentPlan} Plan
          </h2>
          <p className="text-xs text-zinc-500 mt-1 max-w-md">
            Includes high-precision multimodal OCR parsing, unlimited query history, and SOC2 compliant encryption.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => handleUpgrade("Professional", 29)}
            disabled={loadingCheckout}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1.5"
          >
            <Sparkles className="h-4 w-4" />
            {loadingCheckout ? "Opening Stripe..." : "Upgrade to Pro ($29/mo) — Remove Ads"}
          </button>
        </div>
      </div>

      {/* Usage Quota Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 font-medium">Monthly Page Quota</div>
          <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">1,240 / 5,000</div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-indigo-600 h-full w-[24.8%]"></div>
          </div>
          <div className="text-[11px] text-zinc-400 mt-2">24.8% consumed • Resets in 18 days</div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 font-medium">Team Seats Used</div>
          <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">6 / 15 Seats</div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full w-[40%]"></div>
          </div>
          <div className="text-[11px] text-zinc-400 mt-2">9 seats remaining on current plan</div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 font-medium">Payment Method</div>
          <div className="text-sm font-bold text-zinc-900 dark:text-zinc-50 mt-2 flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-zinc-400" />
            <span>Mastercard ending in 4242</span>
          </div>
          <div className="text-[11px] text-zinc-400 mt-3">Next billing date: November 1, 2026</div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Invoice & Billing History</h3>
          <span className="text-xs text-zinc-400">All prices in USD</span>
        </div>

        <div className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs">
          {MOCK_INVOICES.map((inv) => (
            <div key={inv.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{inv.id}</span>
                <span className="text-zinc-400 text-[11px]">{inv.date}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  {inv.status}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{inv.amount}</span>
                <button className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 text-[11px]">
                  <Download className="h-3.5 w-3.5" />
                  PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
