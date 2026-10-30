"use client";

import { useState } from "react";
import { Shield, Key, Users, Lock, CheckCircle2, AlertCircle } from "lucide-react";

export default function SettingsSecurityPage() {
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const teamMembers = [
    { name: "Alex Lindqvist", email: "alex@acmecorp.com", role: "Owner / Admin", status: "Active" },
    { name: "Sarah Chen", email: "sarah.c@acmecorp.com", role: "Legal Counsel", status: "Active" },
    { name: "Marcus Vance", email: "marcus@acmecorp.com", role: "Financial Auditor", status: "Active" },
    { name: "Elena Rostova", email: "elena@acmecorp.com", role: "Compliance Officer", status: "Pending Invite" }
  ];

  const copyKey = () => {
    navigator.clipboard.writeText("dm_live_9f81a7b9201bc43029941a8e");
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Organization, Team & Security Settings
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Configure API credentials, audit logs, and member access permissions.
        </p>
      </div>

      {/* API Credentials */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Key className="h-4 w-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Live API Key</h3>
        </div>
        <p className="text-xs text-zinc-500 mb-4">
          Use this key to ingest PDFs and retrieve verifiable citations via the DocuMind REST and Python SDKs.
        </p>

        <div className="flex items-center gap-3 max-w-xl">
          <input
            type={apiKeyVisible ? "text" : "password"}
            readOnly
            value="dm_live_9f81a7b9201bc43029941a8e"
            className="flex-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs font-mono text-zinc-900 dark:text-zinc-100"
          />
          <button
            onClick={() => setApiKeyVisible(!apiKeyVisible)}
            className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {apiKeyVisible ? "Hide" : "Show"}
          </button>
          <button
            onClick={copyKey}
            className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
          >
            {copiedKey ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Team Roster */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Active Team Seats</h3>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90">
            Invite Team Member
          </button>
        </div>

        <div className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs">
          {teamMembers.map((member, i) => (
            <div key={i} className="px-6 py-3.5 flex items-center justify-between">
              <div>
                <div className="font-semibold text-zinc-900 dark:text-zinc-100">{member.name}</div>
                <div className="text-[11px] text-zinc-400">{member.email}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-zinc-500">{member.role}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  member.status === "Active"
                    ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                    : "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                }`}>
                  {member.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Compliance Audit */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-4 w-4 text-emerald-500" />
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Security & Compliance Safeguards</h3>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
            <div>
              <div className="font-semibold text-zinc-800 dark:text-zinc-200">Zero Model Training Mode</div>
              <div className="text-zinc-400 text-[11px]">Strict API contracts ensure uploaded documents are never cached or used for fine-tuning.</div>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Enforced</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
            <div>
              <div className="font-semibold text-zinc-800 dark:text-zinc-200">Envelope Encryption (AES-256-GCM)</div>
              <div className="text-zinc-400 text-[11px]">Unique tenant keys rotated automatically every 90 days.</div>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
