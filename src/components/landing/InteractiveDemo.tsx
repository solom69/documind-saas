"use client";

import { useState } from "react";
import { Send, FileText, CheckCircle2, AlertCircle, Quote, Sparkles, ShieldCheck } from "lucide-react";

interface DemoPreset {
  question: string;
  answer: string;
  sourceDoc: string;
  sourcePage: number;
  confidence: number;
  quote: string;
}

const PRESETS: DemoPreset[] = [
  {
    question: "What is the liability cap under Section 12?",
    answer: "The total aggregate liability of either party is capped at 2x the total fees paid during the preceding 12-month period, excluding gross negligence or willful misconduct.",
    sourceDoc: "Master_Services_Agreement_2026.pdf",
    sourcePage: 14,
    confidence: 99.4,
    quote: "Section 12.2: IN NO EVENT SHALL EITHER PARTY'S AGGREGATE LIABILITY EXCEED TWO TIMES (2X) THE SUMS PAID HEREUNDER..."
  },
  {
    question: "Can an employee carry over unused PTO to the next calendar year?",
    answer: "Yes, up to a maximum of 5 unused paid time-off days may be rolled over into the next fiscal year, but they must be utilized before March 31st.",
    sourceDoc: "Global_Employee_Handbook_v4.pdf",
    sourcePage: 28,
    confidence: 98.7,
    quote: "Employees may carry forward a balance not exceeding five (5) accrued days into Q1 of the following calendar year."
  },
  {
    question: "What is our standard SLA for Sev-1 downtime incidents?",
    answer: "For Critical (Sev-1) incidents, the target response time is within 15 minutes, with continuous active investigation until a temporary hotfix or resolution is implemented.",
    sourceDoc: "Enterprise_SLA_Terms.pdf",
    sourcePage: 3,
    confidence: 99.8,
    quote: "Priority 1 (Critical): Acknowledged within 15 minutes 24/7/365, with updates dispatched every 30 minutes until restored."
  }
];

export function InteractiveDemo() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [customInput, setCustomInput] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string; citation?: DemoPreset }>>([
    {
      sender: "user",
      text: PRESETS[0].question
    },
    {
      sender: "ai",
      text: PRESETS[0].answer,
      citation: PRESETS[0]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const selectPreset = (idx: number) => {
    setActiveIdx(idx);
    const preset = PRESETS[idx];
    setIsTyping(true);
    setMessages((prev) => [...prev, { sender: "user", text: preset.question }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: preset.answer,
          citation: preset
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const query = customInput;
    setCustomInput("");
    setIsTyping(true);
    setMessages((prev) => [...prev, { sender: "user", text: query }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Verified against 1,482 indexed enterprise pages: based on current documentation, this query matches Section 4.3 compliance protocols with cryptographic audit trails.`,
          citation: {
            question: query,
            answer: "",
            sourceDoc: "Corporate_Governance_Policy.pdf",
            sourcePage: 9,
            confidence: 98.9,
            quote: "All relevant actions must maintain an immutable ledger audit trail verified by multi-tenant authentication."
          }
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div id="demo" className="py-20 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Zero-Hallucination Grounding
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Ask any question. See exact page citations.
          </h2>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
            Never trust a black-box AI again. DocuMind highlights the precise clause, page number, and source document for complete audit compliance.
          </p>
        </div>

        {/* Quick prompt badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-xs font-medium text-zinc-500 uppercase">Try asking:</span>
          {PRESETS.map((preset, i) => (
            <button
              key={i}
              onClick={() => selectPreset(i)}
              className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                activeIdx === i
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                  : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-indigo-400"
              }`}
            >
              "{preset.question.slice(0, 36)}..."
            </button>
          ))}
        </div>

        {/* Sandbox Window */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl overflow-hidden flex flex-col md:flex-row h-[560px]">
          {/* Main conversation */}
          <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800">
            <div className="px-4 py-3 bg-zinc-50/80 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Live Grounded Session</span>
              </div>
              <span className="text-xs text-zinc-500">Model: Gemini 1.5 Pro + Hybrid Vector-BM25</span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      m.sender === "user"
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-zinc-100 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 rounded-bl-none border border-zinc-200/50 dark:border-zinc-700/50"
                    }`}
                  >
                    <p className="leading-relaxed">{m.text}</p>
                    
                    {m.citation && (
                      <div className="mt-3 pt-2.5 border-t border-zinc-200 dark:border-zinc-700 text-xs">
                        <div className="flex items-center gap-1.5 font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                          <Sparkles className="h-3 w-3" />
                          <span>Grounded Source Verified (99% confidence)</span>
                        </div>
                        <div className="bg-white/80 dark:bg-zinc-900/80 rounded p-2 border border-zinc-200 dark:border-zinc-700 font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
                          <p className="italic">"{m.citation.quote}"</p>
                          <div className="mt-1 flex items-center justify-between text-zinc-500 font-sans">
                            <span>📄 {m.citation.sourceDoc}</span>
                            <span className="font-semibold text-indigo-600 dark:text-indigo-400">Page {m.citation.sourcePage}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 italic p-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce"></div>
                  <div className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce delay-100"></div>
                  <div className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce delay-200"></div>
                  <span>Analyzing multi-document chunks with citations...</span>
                </div>
              )}
            </div>

            {/* Input bar */}
            <form onSubmit={handleCustomSubmit} className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
              <input
                type="text"
                placeholder="Ask anything about contracts, SLAs, or internal policies..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-zinc-100"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Right audit inspector sidebar */}
          <div className="w-full md:w-72 bg-zinc-50/50 dark:bg-zinc-900/30 p-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Live Verification Inspector
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <div className="text-xs text-zinc-500">Active Document</div>
                  <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate mt-0.5">
                    {PRESETS[activeIdx].sourceDoc}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      OCR Cleaned
                    </span>
                    <span className="text-[10px] text-zinc-500">Page {PRESETS[activeIdx].sourcePage} of 42</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <div className="text-xs text-zinc-500">Hallucination Risk</div>
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1.5">
                    <span>0.00%</span>
                    <span className="text-xs text-zinc-500 font-normal">(Verified)</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[99.5%]"></div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                    <ShieldCheck className="h-4 w-4" />
                    SOC2 & HIPAA Compliant
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                    Your confidential documents are encrypted in flight and at rest with AES-256 and never used to train public LLMs.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-400 text-center">
              Powered by Vector Embeddings + Keyword Grounding
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
