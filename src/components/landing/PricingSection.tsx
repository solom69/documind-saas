"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Sparkles, Zap, Building2 } from "lucide-react";
import confetti from "canvas-confetti";

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  const triggerConfetti = () => {
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const plans = [
    {
      name: "Starter",
      desc: "For solo founders, freelancers, and small boutique consultancies.",
      monthlyPrice: 29,
      annualPrice: 24,
      features: [
        "Up to 500 document pages/mo",
        "Standard OCR & PDF parser",
        "Single workspace & 2 users",
        "Direct citation links to pages",
        "Standard email support",
      ],
      cta: "Start 14-Day Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      desc: "For growing teams reviewing contracts, policies, and complex manuals.",
      monthlyPrice: 79,
      annualPrice: 64,
      features: [
        "Up to 5,000 document pages/mo",
        "Multilingual table & OCR parsing",
        "Up to 15 team seats",
        "Slack & Microsoft Teams integration",
        "Audit trail & exportable summaries",
        "Priority 24/7 support response",
      ],
      cta: "Get Started Free",
      popular: true,
    },
    {
      name: "Enterprise",
      desc: "For regulated industries requiring dedicated private VPC and strict compliance.",
      monthlyPrice: 299,
      annualPrice: 249,
      features: [
        "Unlimited document ingestion",
        "Zero-retention private LLM endpoints",
        "Single Sign-On (SSO / SAML / Okta)",
        "Custom RBAC & enterprise audit logs",
        "Dedicated customer success manager",
        "Custom BAA & SLA agreements",
      ],
      cta: "Contact Enterprise Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
            Transparent Pricing
          </h2>
          <p className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Pay for confidence, not hallucinations.
          </p>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Every plan includes exact citations, encrypted cloud storage, and automated document segmentation.
          </p>

          {/* Toggle billing */}
          <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                !annual
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => {
                setAnnual(true);
                triggerConfetti();
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                annual
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              }`}
            >
              <span>Annual billing</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-400 text-zinc-950 font-bold text-[10px]">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:translate-y-[-4px] ${
                p.popular
                  ? "border-2 border-indigo-600 dark:border-indigo-500 shadow-2xl shadow-indigo-500/10 bg-white dark:bg-zinc-900"
                  : "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{p.name}</h3>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 min-h-[36px]">{p.desc}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">
                    ${annual ? p.annualPrice : p.monthlyPrice}
                  </span>
                  <span className="text-xs text-zinc-500">/seat/month</span>
                </div>
                {annual && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                    Billed annually (${p.annualPrice * 12}/year)
                  </p>
                )}

                <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 mb-4">Included capabilities:</p>
                  <ul className="space-y-3">
                    {p.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href="/auth/signin"
                  className={`w-full py-2.5 rounded-xl font-medium text-xs text-center block transition-all ${
                    p.popular
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30"
                      : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
