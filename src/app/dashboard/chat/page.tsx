"use client";

import { useState } from "react";
import { 
  Send, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  BookOpen, 
  Copy, 
  Check, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { ChatMessage } from "@/types";
import { AdBanner } from "@/components/ads/AdBanner";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "ai",
    text: "Hello Alex. I have indexed all 4 enterprise contracts, audited financials, and HR guidelines. Ask me any clause, formula, or policy requirement with instant cryptographic citation verification.",
    timestamp: "10:00 AM"
  },
  {
    id: "msg-2",
    sender: "user",
    text: "Does our Master Services Agreement allow unilateral termination for convenience, and what is the notice window?",
    timestamp: "10:01 AM"
  },
  {
    id: "msg-3",
    sender: "ai",
    text: "Yes, unilateral termination for convenience is permitted, but requires a mandatory sixty (60) calendar days prior written notice. Additionally, any prepaid fees for unused services beyond the effective termination date must be refunded within thirty (30) days.",
    timestamp: "10:01 AM",
    citations: [
      {
        docName: "Master_Services_Agreement_2026.pdf",
        page: 19,
        quote: "Section 14.3 (Termination for Convenience): Either party may terminate this Agreement without cause upon sixty (60) days prior written notice to the other party..."
      }
    ]
  }
];

export default function ChatWorkspacePage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText;
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history: messages })
      });

      if (!res.ok) {
        throw new Error("Server responded with error status");
      }

      const data = await res.json();

      const aiResponse: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: "ai",
        text: data.text || "No response received.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        citations: data.citations || []
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          sender: "ai",
          text: `⚠️ **Unable to complete query**: ${err?.message || "Check your API connection or .env.local file."}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyAnswer = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-50 dark:bg-zinc-950">
      {/* Top Header */}
      <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
            AI Query Workspace • Grounded Live Vector Search
          </span>
          <span className="text-[10px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
            4 documents in context
          </span>
        </div>

        <div className="text-xs text-zinc-500 flex items-center gap-2">
          <span>Mode:</span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">Strict Citation (0% Hallucination)</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl mx-auto w-full">
        <AdBanner variant="banner" />
        {messages.map((msg, index) => (
          <div key={msg.id}>
            <div
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
            <div className="flex items-center gap-2 mb-1.5 text-[11px] text-zinc-400 px-1">
              <span>{msg.sender === "user" ? "You" : "DocuMind Assistant"}</span>
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`rounded-2xl p-4 text-sm max-w-[90%] shadow-sm ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-bl-none"
              }`}
            >
              <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Verified Citation Source</span>
                    </div>
                    <button
                      onClick={() => copyAnswer(msg.id, msg.text)}
                      className="text-[10px] text-zinc-400 hover:text-zinc-600 flex items-center gap-1"
                    >
                      {copiedId === msg.id ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      {copiedId === msg.id ? "Copied citation" : "Copy response"}
                    </button>
                  </div>

                  {msg.citations.map((cite, ci) => (
                    <div
                      key={ci}
                      className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700/60 font-mono text-xs text-zinc-700 dark:text-zinc-300 space-y-1"
                    >
                      <div className="italic text-[11px]">"{cite.quote}"</div>
                      <div className="flex items-center justify-between font-sans text-[11px] text-zinc-500 pt-1">
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3 text-indigo-500" />
                          {cite.docName}
                        </span>
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                          Page {cite.page}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            </div>
            {/* Show an in-feed sponsored ad after message 2 */}
            {index === 1 && <AdBanner variant="in-chat" />}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-zinc-500 p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 w-fit">
            <Sparkles className="h-4 w-4 text-indigo-500 animate-spin" />
            <span>Scanning 428 vector chunks and extracting matching citations...</span>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask a question about your indexed contracts or policies..."
            className="flex-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Ask AI</span>
          </button>
        </form>
      </div>
    </div>
  );
}
