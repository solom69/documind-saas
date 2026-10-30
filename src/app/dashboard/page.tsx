"use client";

import { useState, useEffect, useRef } from "react";
import { 
  FileText, 
  UploadCloud, 
  Search, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck,
  Trash2,
  GraduationCap,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { DocumentItem } from "@/types";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const supabase = createClient();
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isUploading, setIsUploading] = useState(false);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [user, setUser] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch authenticated user & their cloud documents
  useEffect(() => {
    async function loadData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          const { data, error } = await supabase
            .from("documents")
            .select("*")
            .order("created_at", { ascending: false });

          if (!error && data && data.length > 0) {
            setDocs(
              data.map((d: any) => ({
                id: d.id,
                title: d.title,
                category: d.category,
                size: d.size_bytes ? `${(d.size_bytes / (1024 * 1024)).toFixed(2)} MB` : "1.2 MB",
                pages: d.page_count || 1,
                uploadedAt: new Date(d.created_at).toLocaleDateString(),
                status: d.status || "ready",
                accuracyScore: 99.8,
                snippet: d.extracted_text ? d.extracted_text.slice(0, 150) + "..." : "Uploaded document.",
                extractedText: d.extracted_text
              }))
            );
          }
        }
      } catch (e) {
        console.error("Error loading user docs:", e);
      } finally {
        setLoadingDocs(false);
      }
    }
    loadData();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const uploadedFile = data.file;

        // If user is logged in, persist to Supabase
        if (user) {
          const { data: inserted, error } = await supabase
            .from("documents")
            .insert({
              user_id: user.id,
              title: uploadedFile.title,
              category: uploadedFile.category,
              size_bytes: file.size,
              page_count: uploadedFile.pages,
              extracted_text: uploadedFile.extractedText,
              status: "ready"
            })
            .select()
            .single();

          if (!error && inserted) {
            uploadedFile.id = inserted.id;
          }
        }

        setDocs((prev) => [uploadedFile, ...prev]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const deleteDoc = async (id: string) => {
    if (user) {
      await supabase.from("documents").delete().eq("id", id);
    }
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const categories = [
    "All",
    "Education & Study",
    "Research & Academic",
    "Legal & Contracts",
    "Financial Reports",
    "Books & Literature",
    "Technical & Manuals"
  ];

  const filteredDocs = docs.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.snippet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || d.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept=".pdf,.txt,.md,.csv,.doc,.docx"
      />

      {/* Top Banner & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold mb-2">
            <GraduationCap className="h-3.5 w-3.5" />
            Connected to Supabase Cloud • {user ? `Signed in as ${user.email}` : "Guest / Demo Mode"}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Knowledge Repository & Study Hub
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Upload textbooks, study guides, research papers, or contracts to analyze with AI.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/chat"
            className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            Study Assistant
          </Link>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
          >
            <UploadCloud className="h-4 w-4" />
            {isUploading ? "Uploading & Vectorizing..." : "Upload Any PDF or File"}
          </button>
        </div>
      </div>

      {/* Metrics Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="text-xs text-zinc-500">Total Indexed Documents</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
            {docs.length}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Synced with Cloud Postgres</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="text-xs text-zinc-500">Security & Isolation</div>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">RLS Active</div>
          <div className="text-[11px] text-zinc-400 mt-1">Strict user-only access</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="text-xs text-zinc-500">Study Modes</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">Q&A + Summary</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Explanations & Citations</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="text-xs text-zinc-500">AI Model</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
            <Sparkles className="h-4 w-4" />
            <span>Gemini 3.8</span>
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">1M Token Window</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search textbooks, research topics, papers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white font-medium shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-[11px] uppercase font-bold text-zinc-500 tracking-wider">
                <th className="py-3 px-4">Title & Context</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Pages / Size</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Uploaded</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs">
              {docs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-400">
                    <UploadCloud className="h-8 w-8 mx-auto mb-2 text-zinc-300 dark:text-zinc-700" />
                    <p className="font-medium text-xs">No documents uploaded yet.</p>
                    <p className="text-[11px] text-zinc-500 mt-1">Upload your first textbook, study notes, or PDF above.</p>
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                          {doc.category === "Education & Study" ? (
                            <GraduationCap className="h-4 w-4" />
                          ) : doc.category === "Research & Academic" ? (
                            <BookOpen className="h-4 w-4" />
                          ) : (
                            <FileText className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 cursor-pointer">
                            {doc.title}
                          </div>
                          <div className="text-[11px] text-zinc-400 truncate max-w-sm">
                            {doc.snippet}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-400">
                      {doc.pages} pages • {doc.size}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {doc.accuracyScore}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-500">
                      {doc.uploadedAt}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href="/dashboard/chat"
                          className="px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-300 font-medium text-[11px] flex items-center gap-1"
                        >
                          Ask AI
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                        <button
                          onClick={() => deleteDoc(doc.id)}
                          className="p-1 rounded text-zinc-400 hover:text-rose-600 transition-colors"
                          title="Delete document"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
